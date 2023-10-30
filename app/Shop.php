<?php

namespace App;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Shop extends Model
{
    use HasFactory;

    protected $guarded=[];

    public function brands()
    {
        return $this->hasMany(Brand::class);
    }

    public function users()
    {
        return $this->hasMany(User::class);
    }

    public function categories()
    {
        return $this->hasMany(Category::class);
    }

    public function customers()
    {
        return $this->hasMany(Customer::class);
    }

    public function suppliers()
    {
        return $this->hasMany(Supplier::class);
    }

    public function products()
    {
        return $this->hasMany(Product::class);
    }

    public function pos()
    {
        return $this->hasMany(Pos::class);
    }

    public function pos_items()
    {
        return $this->hasMany(PosItem::class);
    }

    public function payments()
    {
        return $this->hasMany(Payment::class);
    }

    public function purchases()
    {
        return $this->hasMany(Purchase::class);
    }

    public function purchase_items()
    {
        return $this->hasMany(PurchaseItem::class);
    }

    public function expense_categories()
    {
        return $this->hasMany(ExpenseCategory::class);
    }

    public function expenses()
    {
        return $this->hasMany(Expense::class);
    }

    public function actual_payments()
    {
        return $this->hasMany(ActualPayment::class);
    }

    public function damages()
    {
        return $this->hasMany(Damage::class);
    }

    public function order_returns()
    {
        return $this->hasMany(OrderReturn::class);
    }

    public function return_items()
    {
        return $this->hasMany(ReturnItem::class);
    }

    public function bank_accounts()
    {
        return $this->hasMany(BankAccount::class);
    }


    public function units()
    {
        return $this->hasMany(Unit::class);
    }

    public function product_stocks()
    {
        return $this->hasMany(ShopProductStock::class,'shop_id');
    }


    // custom
    public function get_product_stock($product_id)
    {
        $product_stock = $this->product_stocks()->where('product_id', $product_id)->first();
        if (!$product_stock) {
            $product_stock = $this->product_stocks()->create([
                'product_id' => $product_id
            ]);
        }

        return $product_stock;
    }

    static function boot()
    {
        parent::boot();


        static::deleting(function($shop){
            if($shop->is_default){
                return false;
            }

            $relationMethods = ['brands',
                'users',
                'categories',
                'customers',
                'suppliers',
                'products',
                'pos',
                'pos_items',
                'payments',
                'purchases',
                'purchase_items',
                'expense_categories',
                'expenses',
                'actual_payments',
                'damages',
                'order_returns',
                'return_items',
                'bank_accounts',
                'units'
            ];

            foreach ($relationMethods as $relationMethod) {
                if ($shop->$relationMethod()->count() > 0) {
                    return false;
                }
            }
        });
    }
}
