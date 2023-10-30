<?php

namespace App\Http\Controllers;

use App\Area;
use App\Category;
use App\DeliveryMethod;
use App\Pos;
use App\PosItem;
use App\Product;
use App\Customer;
use App\Shop;

// use App\DeliveryMethod;
use App\Payment;
use App\Stock;
use App\ActualPayment;
use App\DeliveryAgent;
use App\PosSetting;
use App\PurchaseItem;
use App\Role;
use App\OrderStatus;
use App\Services\StockService;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class PosController extends Controller
{
    public function __construct()
    {    
        $this->middleware('can:create-pos',  ['only' => ['create', 'store']]);
        $this->middleware('can:edit-pos',  ['only' => ['edit', 'update']]);
        $this->middleware('can:delete-pos', ['only' => ['destroy']]);
        $this->middleware('can:list-pos', ['only' => ['index']]);
        $this->middleware('can:show-pos', ['only' => ['show']]);

        $this->middleware('can:pos-add_payment', ['only' => ['add_payment','store_payment']]);
        $this->middleware('can:pos-add_customer', ['only' => ['add_customer','store_customer']]);
        $this->middleware('can:pos_receipt', ['only' => ['pos_receipt']]);
        $this->middleware('can:chalan_receipt', ['only' => ['chalan_receipt']]);

        $this->middleware('can:purchase_cost_breakdown', ['only' => ['purchase_cost_breakdown']]);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        // dd($request->all());
        $sales     = new Pos();
        $todaySale = Pos::where('sale_date', date('Y-m-d'))->get();
        $pos       = new Pos();

        $sales = $sales->filter($request, $sales);
        $sales = $sales->where('order_type', 'general')->orderBy('sale_date', 'DESC');

        $sales = $sales->with('customer')->orderBy('id','desc')->paginate(20);
        $customers = Customer::select('id','name','phone')->get();
        $products = Product::select('id','name','code')->get();
        return view('pages.pos.index', compact('sales', 'customers','products'))
            ->withPos($pos)
            ->withTodaySale($todaySale);
            // ->withCustomers(Customer::all());
    }

    public function online_sales(Request $request){
        $sales = new Pos();
        $todaySale = Pos::where('sale_date', date('Y-m-d'))->get();
        $pos = new Pos();
        $order_status_list = OrderStatus::all();

        $sales = $sales->filter($request, $sales);
        $sales = $sales->where('order_type', 'online')->orderBy('sale_date', 'DESC');

        $delivery_methods = DeliveryMethod::all();

        return view('pages.pos.online')
            ->withPos($pos)
            ->with('order_status_list', $order_status_list)
            ->with('delivery_methods', $delivery_methods)
            ->withTodaySale($todaySale)
            ->withCustomers(Customer::all())
            ->withSales($sales->orderBy('created_at', 'desc')->paginate(20));
    }

    public function pos_products(Request $request)
    {
        $data = [];

        if ($request->ajax()) {
            $products = new Product();

            if ($request->code != null) {
                $products = $products->where('name', 'like', '%' . $request->code . '%')->orWhere('code', 'like', '%' . $request->code . '%');
            }

            if ($request->category != null) {
                $products            = $products->where('category_id', $request->category);
                $data['category_id'] = $request->category;
            }



            $data['products'] = $products->orderBy('name')->paginate(10);

            return view('pages.pos.products', $data)->render();
        }
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create(Request $request)
    {
        // dd("");
        $customers = Customer::latest()->get();
        $products  = new Product();
        $area_list = Area::all();
        $delivery_methods = DeliveryAgent::all();
        $order_status_list = OrderStatus::all();

        if ($request->code != null) {
            $products = $products->where('code', 'like', '%' . $request->code . '%');
        }

        $products = $products->orderBy('name')->paginate(10);
     
        return view('pages.pos.create', compact('products', 'customers','area_list','delivery_methods','order_status_list'));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        // dd($request->all());
        $request->validate([
            'name' => 'required',
            'product_id' => 'required|array',
            'sub_total'  => 'required'
        ]);

         // Validation
        if ($request->receivable_amount < $request->cost_amount) {
            session()->flash('warning', 'less than the purchase price.');
            return back();
        }

        if ($request->order_type == 'online' && $request->delivery_agent == null) {
            session()->flash('warning', 'Please select delivery agent.');
            return back();
        }

        try {
            DB::beginTransaction();

            $pos = Pos::create([
                'sale_date'   => $request->sale_date,
                'sale_by'     => auth()->id(),
                'customer_id' => $request->customer,
                'order_type' => $request->order_type,
                'discount'    => $request->discount,
                'receivable'     => $request->receivable_amount,
                'final_receivable'     => $request->receivable_amount,
                'note'          => $request->note,
                'shop_id'=> session('shop')
                // 'delivery_cost'=>$request->delivery_cost,
                // 'delivery_method_id'=>$request->delivery_method,
            ]);

            if ($request->order_type == 'online') {
                $pos->delivery_agent_id = $request->delivery_agent;
                $pos->area_id = $request->delivery_area;
                $pos->order_status = $request->order_status;
                $pos->delivery_charge = $request->delivery_charge;
            }


            $pos_number      = str_pad($pos->id + 1, 8, '0', STR_PAD_LEFT);
            $pos->pos_number = '# ' . $pos_number;
            $pos->save();

            StockService::add_new_pos_items_and_recalculate_cost($request, $pos);

            $pos->update_calculated_data();

            // Make Payment
            if ($request->pay_amount != null) {

                $actual_payment = ActualPayment::create([
                    'customer_id' => $request->customer,
                    'amount'      => $request->pay_amount,
                    'date'        => $request->sale_date,
                    'payment_type'      => 'receive',
                    'note'              => $request->note,
                    'shop_id'=> session('shop')
                ]);

                $pos->payments()->create([
                    'payment_date'      => $request->sale_date,
                    'actual_payment_id' => $actual_payment->id,
                    'bank_account_id'   => $request->bank_account_id,
                    'payment_type'      => 'receive',
                    'pay_amount'        => $request->pay_amount,
                    'method'            => $request->payment_method,
                    'shop_id'=> session('shop')
                ]);
            }

            DB::commit();
            if($pos->order_type =='online'){
            return redirect()->route('pos_online_sale_receipt', $pos->id);
            }
            return redirect()->route('pos_general_sale_receipt', $pos->id);

        } catch (\Exception $e) {
            DB::rollback();
            info($e);
            // dd($e->getMessage());
            if($e->getMessage()=="Quantity Empty"){
                session()->flash('warning', 'Please enter product quantity properly.');
            }elseif($e->getMessage()=="Low Stock"){
                session()->flash('warning', 'Some Products Does not Have stock!');
            }else{
                session()->flash('error', 'Oops Something went wrong!');
            }

            return back();
        }

    }

    public function pos_receipt($pos_id)
    {
        $shop = Shop::find(session('shop'));
        $pos = Pos::findOrFail($pos_id);
        $pos_settings = PosSetting::first();

        if ($pos_settings->invoice_type == 'a4') {
            return view('pages.pos.receipts.a4')->with('pos', $pos);
        } elseif ($pos_settings->invoice_type == 'pos') {
            return view('pages.pos.receipts.pos',compact('shop'))->with('pos', $pos);
        }
        return view('pages.pos.receipts.a4')->with('pos', $pos);

    }

    public function pos_general_sale_receipt($pos_id)
    {
        $shop = Shop::find(session('shop'));
        $pos = Pos::findOrFail($pos_id);
        $pos_settings = PosSetting::first();
        return view('pages.pos.receipts.pos')->with('pos', $pos);

    }

    public function pos_online_sale_receipt($pos_id)
    {
        $shop = Shop::find(session('shop'));
        $pos = Pos::findOrFail($pos_id);
        $pos_settings = PosSetting::first();

        return view('pages.pos.receipts.a4')->with('pos', $pos);

    }

    public function chalan_receipt($pos_id)
    {

        $pos = Pos::findOrFail($pos_id);
        return view('pages.pos.chalan')->with('pos', $pos);
    }

    /**
     * Display the specified resource.
     *
     * @param \App\Pos $pos
     * @return \Illuminate\Http\Response
     */
    public function show(Pos $po)
    {
        return view('pages.pos.show',['pos'=>$po]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param \App\Pos $po
     * @return \Illuminate\Http\Response
     */
    public function edit(Pos $po)
    {

        $pos       = $po;
        $customers = Customer::latest()->get();
        $products  = Product::orderBy('name')->paginate(10);

        $delivery_methods = DeliveryMethod::all();

        return view('pages.pos.edit', compact('products', 'customers', 'delivery_methods', 'pos'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param \App\Pos $po
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Pos $po)
    {
        // dd($request->all());
        // dd($po);
        $pos = $po;
        //        dd( $request->all() );
        $pos_id = $request->pos_id;

        try{
            DB::beginTransaction();
            // Update Portion
            StockService::update_pos_items_and_recalculate_cost($request, $pos);

            // create new
            // Add POS Items
            // Calcucalte individual purchase
            StockService::add_new_pos_items_and_recalculate_cost($request, $pos);

            if (strpos($pos->discount, '%') !== false) {
                $discount = (float)str_replace("%", " ", $pos->discount);

                $discount_amount = $pos->items()->sum('sub_total') * ($discount / 100);

                $new_receivable = $pos->delivery_cost + $pos->items()->sum('sub_total') - $discount_amount;
            } else {
                $new_receivable = $pos->delivery_cost + $pos->items()->sum('sub_total') - $pos->discount;
            }

            $pos->receivable = $new_receivable;

            $pos->save();

            // update total purchase cost
            $pos->update_calculated_data();

            DB::commit();

            return redirect()->route('pos_receipt', $pos->id);
        }catch(\Exception $e){
            info($e);
            DB::rollback();
            session()->flash('warning', 'Oops! Something went wrong');
            return back();
        }

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param \App\Pos $pos
     * @return \Illuminate\Http\Response
     */
    public function destroy(Pos $po)
    {
        // $po->items()->delete();
        // $po->payments()->delete();
        $po->forceDelete();
        session()->flash('success', 'Sale Deleted');
        return back();
    }

    public function get_product()
    {
        $product = Product::where('code', request('code'))->first();
        if ($product) {
            return response($product);
        } else {
            return [];
        }
    }

    public function product_search_by_name()
    {
        $query    = request('req');
        $products = Product::where('name', 'LIKE', "%$query%")->orWhere('code', 'LIKE', "%$query%")->get();
        return response()->json($products);
    }

    public function product_search_by_code()
    {
        $query    = request('req');
        $products = Product::where('code', 'LIKE', "%$query%")->get();
        return response()->json($products);
    }

    public function pos_item_product_id($posId)
    {
        $product = PosItem::where('pos_id', $posId)->pluck('product_id');
        return $product;
    }

    public function partial_destroy($id)
    {
        $pos_item = PosItem::find($id);
        $pos_id   = $pos_item->pos_id;
        $pos      = Pos::find($pos_id);

        $total_pos = PosItem::where('pos_id', $pos_id)->get()->count();
        if ($total_pos > 1) {
            $pos_item->delete();
            $pos_item->stock()->delete();

            if (strpos($pos->discount, '%') !== false) {
                $discount = (float)str_replace("%", " ", $pos->discount);

                $discount_amount = $pos->items()->sum('sub_total') * ($discount / 100);
                $new_receivable = $pos->delivery_cost + $pos->items()->sum('sub_total') - $discount_amount;
            } else {
                $new_receivable = $pos->delivery_cost + $pos->items()->sum('sub_total') - $pos->discount;
            }

            $pos->receivable = $new_receivable;

            $pos->save();

            $pos->update_calculated_data();
            session()->flash('success', 'Sale Returned');
            return redirect()->route('pos.edit', $pos_id);
        } else {
            $pos_item->delete();
            $pos_item->stock()->delete();
            $pos->payments()->delete();
            $pos->forceDelete();
            session()->flash('success', 'Sale Deleted');
            return redirect()->route('pos.index');
        }
    }


    public function add_payment(Pos $pos)
    {
        return view('pages.pos.forms.add_payment', compact('pos'));
    }

    public function store_payment(Request $request, Pos $pos)
    {
        $validator = Validator::make($request->all(), [
            "payment_date" => "required",
            "pay_amount" => [
                'required', function ($attribute, $value, $fail) use ($pos, $request) {
                    // dd($value);
                    if($value<=0){
                        return $fail('Amount need to be more than 0');
                    }
                    if ($pos->receivable < $pos->paid + $request->pay_amount) {
                        return $fail('Over Payment not Alowed! Due is ' . $pos->due . ' Tk');
                    }
                }
            ]
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()->all()]);
        }

        // $data=$request->all();
        // $data["user_id"]=auth()->user()->id;
        $actual_payment = ActualPayment::create([
            'customer_id' => $pos->customer_id,
            'amount'      => $request->pay_amount,
            'payment_type'      => 'receive',
            'date'        => $request->payment_date,
            'note'              => $request->note,
            'shop_id'=> session('shop')
        ]);

        $pos->payments()->create([
            'payment_date'      => $request->payment_date,
            'actual_payment_id' => $actual_payment->id,
            'bank_account_id'   => $request->bank_account_id,
            'payment_type'      => 'receive',
            'pay_amount'        => $request->pay_amount,
            'method'            => $request->payment_method,
            'shop_id'=> session('shop')
        ]);

        return response()->json(['success' => 'Added new records.']);
    }


    // AJAX ADD CUSTOMER
    public function add_customer()
    {
        // dd("TEST");
        return view('pages.pos.forms.add_customer');
    }

    public function store_customer(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|max:255',
            'phone' => 'required|unique:customers',
            // 'address' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()->all()]);
        }

        $data = $request->all();
        // $data['shop_id']= session('shop');
        // $data["user_id"]=auth()->user()->id;
        Customer::create($data);
        return response()->json(['success' => 'Added new records.']);
    }
    
    public function purchase_cost_breakdown(Pos $pos){
        return view('pages.pos.purchase_cost_breakdown', compact('pos'));
    }

     public function change_order_status(Request $request)
    {
        $pos = Pos::findOrFail($request->pos_id);
        $needStocks = [];

        foreach ($pos->items as $order_item) {
            // dd($order_item->qyt);
            if ($order_item->qyt > $order_item->product->stock) {
                $needStocks[] = $order_item->product->code;
            }
        }

        if (count($needStocks) > 0) {
            return response()->json(['status' => "Error! Some products does not have stock. The product codes are: " . implode(', ', $needStocks)]);
        }

        $pos->update(['order_status' => $request->status]);
        if ($pos) {

   
         return response()->json(['status' => 'ok']);
        } else {
            return response()->json(['status' => 'Error!']);
        }
    } 
}
