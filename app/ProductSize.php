<?php

namespace App;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductSize extends Model
{
    use HasFactory;

      protected $guarded = [];

    public function product_variations()
    {
        return $this->hasMany(ProductVariation::class);
    }
    // Relations
    public function product()
    {
        return $this->belongsTo(Product::class);
    }

    public function pos_items()
    {
        return $this->hasMany(PosItem::class);
    }

    public function purchase_items()
    {
        return $this->hasMany(PurchaseItem::class);
    }

    public function stocks()
    {
        return $this->hasMany(Stock::class);
    }

    // ****** CUSTOM FUNCTIONS ******

    public function stock()
    {
        // return 0;
        // purhcase-stock=final stock
        $purchased = PurchaseItem::where('product_size_id', $this->id)->sum('qty');
        $sold = PosItem::where('product_size_id', $this->id)->sum('qty');
        // return damage

        $returned=ReturnItem::where('size_id', $this->id)->sum('qty');
        $damaged=Damage::where('size_id', $this->id)->sum('qty');

        return $purchased - $sold - $damaged + $returned;
    }

    // Don't delete if any relation is existing
    protected static function boot()
    {
        parent::boot();
        static::deleting(function ($rel) {
            $relationMethods = ['pos_items', 'purchase_items'];

            foreach ($relationMethods as $relationMethod) {
                if ($rel->$relationMethod()->count() > 0) {
                    return false;
                }
            }
        });
    }
}
