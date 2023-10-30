<?php

namespace App\Services;

use App\ActualPayment;
use App\Supplier;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

class ProductService
{

    public static function make_opening_stock_purchase($request, $product)
    {
        $supplier = new Supplier();
        // check if supplier is available
        $default_supplier = $supplier->get_default();

        // calculate stock
        $main_qty = 0;
        $sub_qty = 0;
        $payable_amount = 0;
        if (count($request->opening_stock) == 2) {
            $main_qty = $request->opening_stock[0];
            $sub_qty = $request->opening_stock[1];
            $payable_amount = $product->calculate_worth($main_qty, $sub_qty, $product->cost);
        } elseif (count($request->opening_stock) == 1) {
            $main_qty = $request->opening_stock[0];
            $payable_amount = $product->calculate_worth($main_qty, 0, $product->cost);
        }

        // $payable_amount = $request->opening_stock * $request->cost;

        $purchase = $default_supplier->purchases()->create([
            'purchase_date' => date('Y-m-d'),
            'shop_id'=>1,
            'payable' => $payable_amount,
            'shop_id'   => session('shop',1)
        ]);

        $purchase->items()->create([
            'shop_id'=>1,
            'product_id' => $product->id,
            'rate' => $product->cost,
            'main_unit_qty' => $main_qty,
            'sub_unit_qty' => $sub_qty,
            'qty' => $product->to_sub_quantity($main_qty, $sub_qty),
            'sub_total' => $payable_amount,
            'shop_id'   => session('shop',1)
        ]);

        // Make it paid
        $actual_payment = ActualPayment::create([
            'shop_id'=>1,
            'supplier_id' => $default_supplier->id,
            'payment_type'      => 'pay',
            'amount'      => $payable_amount,
            'date'        => date('Y-m-d'),
            'shop_id'   => session('shop',1)
        ]);

        $purchase->payments()->create([
            'shop_id'=>1,
            'actual_payment_id' => $actual_payment->id,
            'payment_date'      => date('Y-m-d'),
            'payment_type'      => 'pay',
            'pay_amount'        => $payable_amount,
            'shop_id'   => session('shop',1)
        ]);
    }

    public static function topSaleProducts($count = false)
    {
        $sales = DB::table('pos_items')
            ->where('pos_items.shop_id',session('shop'))
            ->leftJoin('products', 'pos_items.product_id', 'products.id')
            ->select('product_id', 'name', 'code', 'rate', DB::raw('count(*) as total'), DB::raw('SUM(rate) as amount'), DB::raw('SUM(qty) as total_qty'))
            ->groupBy('product_id')
            ->orderBy('total', 'desc');

        if ($count) {
            $sales = $sales->take($count);
        }
        $sales = $sales->get();
        return $sales;
    }

    public static function topSaleProductsThisMonth($count = false)
    {
        $sales = DB::table('pos_items')
            ->where('pos_items.shop_id', session('shop'))
            ->leftJoin('products', 'pos_items.product_id', 'products.id')
            ->select('product_id', 'name', 'code', 'rate', DB::raw('count(*) as total'), DB::raw('SUM(rate) as amount'), DB::raw('SUM(qty) as total_qty'))
            ->groupBy('product_id')
            ->whereMonth('pos_items.created_at', Carbon::now()->month)
            ->orderBy('total', 'desc');

        if ($count) {
            $sales = $sales->take($count);
        }
        $sales = $sales->get();
        return $sales;
    }
    public static function topSaleProductsToday($count = false)
    {
        $sales = DB::table('pos_items')
            ->where('pos_items.shop_id', session('shop'))
            ->leftJoin('products', 'pos_items.product_id', 'products.id')
            ->select('product_id', 'name', 'code', 'rate', DB::raw('count(*) as total'), DB::raw('SUM(rate) as amount'), DB::raw('SUM(qty) as total_qty'))
            ->groupBy('product_id')
            ->whereDate('pos_items.created_at', Carbon::today())
            ->orderBy('total', 'desc');
        if ($count) {
            $sales = $sales->take($count);
        }
        $sales = $sales->get();
        return $sales;
    }
    public static function topSaleProductsDateToDate($start, $end)
    {
        $sales = DB::table('pos_items')
            ->where('pos_items.shop_id', session('shop'))
            ->leftJoin('products', 'pos_items.product_id', 'products.id')
            ->select('product_id', 'name', 'code', 'rate', DB::raw('count(*) as total'), DB::raw('SUM(rate) as amount'), DB::raw('SUM(qty) as total_qty'))
            ->groupBy('product_id')
            ->whereBetween('pos_items.created_at', [$start, $end])
            ->orderBy('total', 'desc')->get();
        return $sales;
    }

    public static function saleDateToDate($start = false, $end = false)
    {
        $sales = DB::table('pos_items')
        ->where('pos_items.shop_id', session('shop'))
            ->leftJoin('products', 'pos_items.product_id', 'products.id')
            ->select('product_id', 'name', 'pos_items.rate', 'products.cost', DB::raw('count(*) as total'), DB::raw('SUM(qty) as total_qty'), DB::raw('SUM(qty * rate) as total_sale'), DB::raw('SUM(products.cost * pos_items.qty) as total_cost'))
            ->groupBy('product_id');

        if ($start != false && $end != false) {
            $sales = $sales->whereBetween('pos_items.created_at', [$start, $end]);
        }
        $sales = $sales->orderBy('total', 'desc')->get();
        return $sales;
    }

    public static function todayLossProfit()
    {
        $sales = DB::table('pos_items')
        ->where('pos_items.shop_id', session('shop'))
            ->leftJoin('products', 'pos_items.product_id', 'products.id')
            ->select('product_id', 'name', 'pos_items.rate', 'products.cost', DB::raw('count(*) as total'), DB::raw('SUM(qty) as total_qty'), DB::raw('SUM(qty * rate) as total_sale'), DB::raw('SUM(products.cost * pos_items.qty) as total_cost'))
            ->groupBy('product_id')
            ->whereDate('pos_items.created_at', Carbon::today())
            ->orderBy('total', 'desc')->get();

        return $sales;
    }

    public static function update_variations($product)
    {
        if ($product->sizes->count() > 0 && $product->colors->count() > 0) {
            foreach ($product->sizes as $size) {
                foreach ($product->colors as $color) {
                    $exist = $product->variations()->where('product_size_id', $size->id)
                        ->where('product_color_id', $color->id)
                        ->first();
                    if (!$exist) {
                        $product->variations()->create([
                            'product_size_id' => $size->id,
                            'product_color_id' => $color->id
                        ]);
                    }
                }
            }
        } elseif ($product->sizes->count() > 0) {
            foreach ($product->sizes as $size) {
                $exist = $product->variations()->where('product_size_id', $size->id)
                    ->whereNull('product_color_id')
                    ->first();
                if (!$exist) {
                    $product->variations()->create([
                        'product_size_id' => $size->id,
                    ]);
                }
            }
        } elseif ($product->colors->count() > 0) {
            foreach ($product->colors as $color) {
                $exist = $product->variations()->where('product_color_id', $color->id)
                    ->whereNull('product_size_id')
                    ->first();
                if (!$exist) {
                    $product->variations()->create([
                        'product_color_id' => $color->id
                    ]);
                }
            }
        }
    }
}
