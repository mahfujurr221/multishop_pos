<?php
namespace App\Services;

use App\Customer;
use App\Expense;
use App\OrderReturn;
use App\Payment;
use App\Pos;
use App\Product;
use App\Purchase;
use App\PurchaseItem;
use App\Supplier;
use Illuminate\Support\Facades\DB;

class SummaryService{
    public static function today_profit()
    {
        $pos = new Pos();
        $expense = new Expense();
        return number_format($pos->todayReceive() - (ProductService::todayLossProfit()->sum('total_cost') +  $expense->todayExpense()->sum('amount')));
    }

    public static function total_product_stock_price(Array $productIds = [])
    {


        $total_stock = Product::sum('stock');
        $total_price= Product::select(DB::raw('SUM(stock*price) as total_price'))->first()->total_price??0;
        return  ['stock' => $total_stock, 'price' => $total_price];
    }

	public static function customer_receivable()
    {
        return Customer::sum('total_receivable');
    }

    public static function supplier_receivable()
    {
        return Supplier::sum('total_receivable');
    }

    public static function total_receivable()
    {
        $customer_receivable=SummaryService::customer_receivable();
        $supplier_receivable=SummaryService::supplier_receivable();

        return $supplier_receivable+$customer_receivable;
    }

	public static function customer_payable()
    {
        return Customer::sum('total_payable');
    }

    public static function supplier_payable()
    {
        return Supplier::sum('total_payable');
    }


    public static function total_payable()
    {
        $customer_payable=SummaryService::customer_payable();
        $supplier_payable=SummaryService::supplier_payable();

        return $customer_payable+$supplier_payable;
    }

    public static function sell_profit($start_date = null, $end_date = null,$all=false)
    {
        $profit = 0;
        $purchase_cost = 0;
        $sell_value = 0;

        $sells = new Pos();

        if($all){
            $sells->withoutGlobalScopes();
        }

        if ($start_date && $end_date) {
            $sells = $sells->where('sale_date', '>=', $start_date)->where('sale_date', '<=', $end_date);
        }


        $sell_value = $sells->sum('final_receivable');
        $purchase_cost = $sells->sum('total_purchase_cost');
        $profit = $sells->sum('profit');

        return [
            'sell_value' => $sell_value,
            'purchase_cost' => $purchase_cost,
            'profit' => $profit
        ];
    }

    // Today Summary
    public static function stock_value()
    {
        $stock_value = Product::withoutGlobalScopes()
        // ->where('products.shop_id',session('shop'))
        ->join('units', 'units.id', '=', 'products.main_unit_id')
        ->join('shop_product_stocks', 'shop_product_stocks.product_id', '=', 'products.id')
        ->where('shop_product_stocks.shop_id',session('shop'))
        ->select(DB::raw('SUM(shop_product_stocks.stock*(1/IFNULL(units.related_by, 1))*price) as sell_value'))->first();
        $purchase_cost = PurchaseItem::withoutGlobalScopes()
            ->where('purchase_items.shop_id',session('shop'))
            ->join('products', 'products.id', '=', 'purchase_items.product_id')
            ->join('units', 'units.id', '=', 'products.main_unit_id')
            ->select(DB::raw('SUM(remaining*(1/IFNULL(units.related_by, 1))*rate) as purchase_cost'))
            ->first();
        return [
            'total_purchase_value' => $purchase_cost->purchase_cost,
            'total_sell_value' => $stock_value->sell_value
        ];
    }
    // Date to Date Summary

    // Date to Date Summary

    public static function sold($start_date = null, $end_date = null){
        if($start_date && $end_date){
            return Pos::where('sale_date','>=',$start_date)->where('sale_date','<=',$end_date)->sum('receivable');
        }
        return Pos::sum('receivable');
    }

    public static function purchased($start_date = null, $end_date = null){
        if($start_date && $end_date){
            return Purchase::where('purchase_date','>=',$start_date)->where('purchase_date','<=',$end_date)->sum('payable');
        }
        return Purchase::sum('payable');
    }

    public static function returned($start_date=null,$end_date=null,$all=false){
        $returns=OrderReturn::query();

        if($start_date&&$end_date){
             $returns = $returns->whereDate('created_at','>=',$start_date)->whereDate('created_at',$end_date);
        }

        if($all){
            $returns=$returns->withoutGlobalScopes();
        }

        return $returns->sum('return_product_value');
    }

    public static function expenses($start_date=null,$end_date=null){
        if($start_date&&$end_date){
            return Expense::whereDate('expense_date','>=',$start_date)->whereDate('expense_date','<=',$end_date)->sum('amount');
        }
        return Expense::sum('amount');
    }

	// Specific Date Data
    public static function date_purchased($date,$all=false)
    {
        $purchases=Purchase::where('transfer_product_id',NULL)->where('purchase_date', $date);
        if($all){
            $purchases=$purchases->withoutGlobalScopes();
        }
        return $purchases->sum('payable');
    }

    public static function date_expense($date,$all=false)
    {
        $expenses=Expense::where('expense_date', $date);
        if($all){
            $expenses=$expenses->withoutGlobalScopes();
        }
        return $expenses->sum('amount');
    }

	public static function date_discount($date,$all=false)
    {
        $payments=Payment::where('payment_date', $date);
        if($all){
            $payments=$payments->withoutGlobalScopes();
        }
        return $payments->sum('discount');
    }
}
