<?php
namespace App\Services;

use App\ActualPayment;
use App\Product;
use App\Purchase;
use Illuminate\Support\Facades\DB;

class PurchaseService{
    public function total_paid()
    {
       return Purchase::sum('paid');
    }

    public function total_due()
    {
        return Purchase::sum('due');
    }

    public function total_payable()
    {
        return Purchase::sum('payable');
    }


    public static function make_payment($request, $purchase)
    {
        // Make Payment
        if ($request->pay_amount != null || $request->pay_amount != 0) {

            $actual_payment = ActualPayment::create([
                'supplier_id' => $request->supplier_id,
                'amount'      => $request->pay_amount,
                'date'        => $request->purchase_date,
                'payment_type'      => 'pay',
                'shop_id'   => session('shop')
            ]);

            $purchase->payments()->create([
                'payment_type'      => 'pay',
                // 'transaction_id' => strtoupper(uniqid('TRANSACTION_')),
                'actual_payment_id' => $actual_payment->id,
                'bank_account_id'   => $request->bank_account_id,
                'payment_date'      => $request->purchase_date,
                'payment_type'      => 'pay',
                'pay_amount'        => $request->pay_amount,
                'shop_id'   => session('shop')
                // 'method' => $request->payment_method,
            ]);
        }
    }


    public static function add_purchase_items($request, $purchase)
    {
        // for ($i = 0; $i < count($request->new_rate); $i++) {
        foreach ($request->new_product as $key=>$product_id) {
            $data       = [];
            $main_qty = 0;
            $sub_qty = 0;
            $qty = 0;
            $product = Product::find($product_id);

            if ($request->new_sub_qty && $request->new_main_qty && array_key_exists($key, $request->new_sub_qty) && array_key_exists($key, $request->new_main_qty)) {
                
                // dd("HELLO");
                // main quantity -> to -> sub quantity
                // plus sub_quantity
                $main_qty = $request->new_main_qty[$key];
                $sub_qty = $request->new_sub_qty[$key];

                $qty = $product->to_sub_quantity($main_qty, $sub_qty);

                $data['purchase_id'] = $purchase->id;
                $data['main_unit_qty'] = $main_qty;
                $data['sub_unit_qty'] = $sub_qty;
                $data['qty']         = $qty;
                $data['remaining']   = $qty;
                $data['product_id']  = $product_id;
                $data['rate']        = $request->new_rate[$key];
                $data['sub_total']      = $request->new_subtotal_input[$key];
                $data['shop_id']   = session('shop');
                 if(is_array($request->variation)&&array_key_exists($key, $request->variation)){
                    $data['product_variation_id']      = $request->variation[$key];
                }

                $purchase->items()->create($data);

            } else if ($request->new_main_qty && array_key_exists($key, $request->new_main_qty)) {
                // main quantity -> to -> sub quantity
                // dd("ONLY MAIN QUANTITY IS SELECTED");
                // dd($request->all());
                $main_qty = $request->new_main_qty[$key];
                $sub_qty = 0;
                // dd($main_qty);
                $qty = $product->to_sub_quantity($main_qty, $sub_qty);
                // dd($qty);
                $data['purchase_id'] = $purchase->id;
                $data['main_unit_qty'] = $main_qty;
                $data['sub_unit_qty'] = $sub_qty;
                $data['qty']         = $qty;
                $data['remaining']   = $qty;
                $data['product_id']  = $product_id;
                $data['rate']        = $request->new_rate[$key];
                $data['sub_total']      = $request->new_subtotal_input[$key];
                $data['shop_id']    = session('shop');
                if(is_array($request->variation)&&array_key_exists($key, $request->variation)){
                    $data['product_variation_id']      = $request->variation[$key];
                }
                $purchase->items()->create($data);
                
            }
        }

    }

    public static function make_purchase($request)
    {
        // dd($request->all());
        // DB TRANSECTION
        try {
            DB::beginTransaction();

            $purchase = Purchase::create([
                'supplier_id'    => $request->supplier_id,
                'purchase_date'  => $request->purchase_date,
                'payable' => $request->payable,
                'carrying_cost'  => $request->carrying_cost,
                'shop_id'   => session('shop')
            ]);


            PurchaseService::add_purchase_items($request, $purchase);

            // $purchase->items()->insert($prepared_data);
            PurchaseService::make_payment($request, $purchase);

            DB::commit();
            return $purchase;
        } catch (\Exception $e) {
            // dd($e);
            info($e);
            DB::rollback();
        }

        return null;
    }

}
