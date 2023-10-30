<?php

namespace App\Http\Controllers;

use App\ActualPayment;
use App\Damage;
use App\Purchase;
use App\PurchaseItem;
use App\ProductTransfer;
use App\ProductTransferItem;
use App\Product;
use App\Shop;
use App\Supplier;
use App\Services\StockService;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Scopes\ActiveShop;
use Redirect,Response;

class ProductTransferController extends Controller
{
     public function __construct()
    {
        $this->middleware('can:create-product-transfer',  ['only' => ['create', 'store']]);
        $this->middleware('can:edit-product-transfer',  ['only' => ['edit', 'update']]);
        $this->middleware('can:delete-product-transfer', ['only' => ['destroy']]);
        $this->middleware('can:list-product-transfer', ['only' => ['index']]);
        $this->middleware('can:show-product-transfer', ['only' => ['show']]);
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $product_transfers = new ProductTransfer();
        $product_transfers = $product_transfers->filter($request, $product_transfers);
        
        $active_shop= session('shop');
        $products = Product::select('id','name','code')->get();
        $product_transfers = $product_transfers->where('by_shop_id',$active_shop)->orderBy('id','DESC')->paginate(20);

        return view('pages.transfer-product.index',compact('product_transfers','products'));
    }

    public function transfer_received(Request $request)
    {
        $product_transfers = new ProductTransfer();
        $product_transfers = $product_transfers->filter($request, $product_transfers);
        
        $active_shop= session('shop');
        $products = Product::select('id','name','code')->get();
        $product_transfers = $product_transfers->where('shop_id',$active_shop)->orderBy('id','DESC')->paginate(20);

        return view('pages.transfer-product.transfer-received',compact('product_transfers','products'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create(Request $request)
    {
        $active_shop= session('shop');
        $shops=Shop::where('id', '!=', $active_shop)->get();
        
        $products  = new Product();

        if ($request->code != null) {
            $products = $products->where('code', 'like', '%' . $request->code . '%');
        }

        $products = $products->orderBy('name')->paginate(10);

        return view('pages.transfer-product.create',compact('shops','products'));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'product_id' => 'required',
            'transfer_date' => 'required',
            'shop_id'=> 'required',
        ]);
        
     
        $transfer_product=ProductTransfer::create([
            'user_id' =>auth()->id(),
            'by_shop_id'=> session('shop'),
            'transfer_date'=>$request->transfer_date,
            'shop_id'=>$request->shop_id,
            'payable'=>$request->receivable_amount,
        ]);


          if ($request->product_id) {
            // dd($request->name);
            foreach ($request->product_id as $key => $value) {

                $variation=null;
                if(is_array($request->variation)&&array_key_exists($key, $request->variation)){
                    $variation=$request->variation[$key];
                }
                // dd($request->qty[$key]);
                $main_qty = 0;
                $sub_qty = 0;

                if ($request->main_qty&&array_key_exists($key, $request->main_qty)) {
                    $main_qty = $request->main_qty[$key];
                }

                if ($request->sub_qty&&array_key_exists($key, $request->sub_qty)) {
                    $sub_qty = $request->sub_qty[$key];
                }

                if($main_qty==0&&$sub_qty==0){
                    throw new \Exception('Quantity Empty');
                }

                $product = Product::find($request->product_id[$key]);
                $qty = $product->to_sub_quantity($main_qty, $sub_qty);

                
                $transfer_product_item = ProductTransferItem::create([
                    'product_transfer_id'=>$transfer_product->id,
                    'product_name' => $request->name[$key],
                    'product_id'   => $request->product_id[$key],
                    'rate'=>          $request->cost[$key],
                    'main_unit_qty' =>  $main_qty,
                    'sub_unit_qty'  => $sub_qty,
                    'qty'          => $qty,
                    'remaining'     =>$qty,
                    'product_variation_id' => $variation,
                    'sub_total'=>$request->sub_total[$key],
                ]);

            }
        }
        
        session()->flash('success', 'ProductTransfer Created...');
        return redirect()->route('product-transfer.index');

    }

    /**
     * Display the specified resource.
     *
     * @param  \App\ProductTransfer  $productTransfer
     * @return \Illuminate\Http\Response
     */
    public function show(ProductTransfer $productTransfer)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\ProductTransfer  $productTransfer
     * @return \Illuminate\Http\Response
     */
    public function edit(ProductTransfer $productTransfer)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\ProductTransfer  $productTransfer
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, ProductTransfer $productTransfer)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\ProductTransfer  $productTransfer
     * @return \Illuminate\Http\Response
     */
    public function destroy(ProductTransfer $productTransfer)
    {
        if($productTransfer->delete()){
            session()->flash('success', 'Product Transfer Deleted !');
        }else{
            session()->flash('error', 'Deletion Failed!.');
        }

        return back();
    }

     public function transfer_received_accept($id){
        $where = array('id' => $id);
		$productTransfer = ProductTransfer::where($where)->first();
		return Response::json($productTransfer);
    }

     public function transfer_received_store(Request $request){
        $id=$request['id'];
        $productTransfer = ProductTransfer::where('id',$id)->first();
        
        $update = ProductTransfer::where('id',$id)->update([
            'status' => 1,
            'received_by'=>auth()->id(),
        ]);

        //Purchase
        $supplier = new Supplier();
        $default_supplier = $supplier->get_default();

        $purchase = Purchase::create([
            'supplier_id'    => $default_supplier->id,
            'transfer_product_id'   => $productTransfer->id,
            'purchase_date'  => $productTransfer->transfer_date,
            'payable' => $productTransfer->payable,
            'carrying_cost'  => 0,
            'shop_id' => session('shop')
        ]);
        
        $purchase = Purchase::where('transfer_product_id', $productTransfer->id)->first();


        foreach(ProductTransferItem::where('product_transfer_id', $productTransfer->id)->get() as $key => $purchase_item){
            $pdata=[
                'shop_id'=>session('shop'),
                'purchase_id'=>$purchase->id,
                'product_id' => $purchase_item->product_id,
                'transfer_product_id'  => $purchase_item->product_transfer_id,
                'rate' => $purchase_item->rate,
                'product_variation_id'=>$purchase_item->product_variation_id,
                'main_unit_qty' => $purchase_item->main_unit_qty,
                'sub_unit_qty' => $purchase_item->sub_unit_qty,
                'qty' => $purchase_item->qty,
                'remaining' =>$purchase_item->remaining,
                'sub_total' => $purchase_item->sub_total,
            ];
            
            $tpurchase = \App\PurchaseItem::create($pdata);

            // Make it paid
            $actual_payment = ActualPayment::create([
                'supplier_id' => $default_supplier->id,
                'payment_type'      => 'pay',
                'amount'      => $productTransfer->payable,
                'date'        => date('Y-m-d'),
                'shop_id'   => session('shop')
            ]);

            $purchase->payments()->create([
                'actual_payment_id' => $actual_payment->id,
                'payment_date'      => date('Y-m-d'),
                'payment_type'      => 'pay',
                'pay_amount'        => $productTransfer->payable,
                'shop_id'   => session('shop')
            ]);
            

        //Damage
        $purchases = StockService::return_purchase_ids_and_qty_for_the_sell($purchase_item->product_id,$purchase_item->product_variation_id,$purchase_item->qty,$productTransfer->by_shop_id);
        // dd($purchases);
        if (count($purchases)>0&&isset($purchases['purchase_items'])) {
            $damage= \App\Damage::create([
                'product_id' => $purchase_item->product_id,
                'date' => $productTransfer->transfer_date,
                'product_variation_id'=>$purchase_item->product_variation_id,
                'main_unit_qty' => $purchase_item->main_unit_qty,
                'sub_unit_qty' => $purchase_item->main_unit_qty,
                'qty' => $purchase_item->qty,
                'shop_id'=> $productTransfer->by_shop_id
            ]);


            foreach ($purchases['purchase_items'] as $key => $dpurcahse) {
                $damage->stock()->create([
                    'purchase_id' => $dpurcahse['purchase_id'],
                    'purchase_item_id' => $dpurcahse['purchase_item_id'],
                    'product_id' => $purchase_item->product_id,
                    'qty' => $dpurcahse['qty'],
                    // 'shop_id'=> session('shop')
                ]);
            }

            } else {
                throw new \Exception('Low Stock');
            }

        }
 

        session()->flash('success', 'Product Transfer Accept...');

        return back();
    }

}
