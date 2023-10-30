<?php

namespace App;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductColor extends Model
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
}
