<?php

namespace App;

use App\Scopes\ActiveShop;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ShopProductStock extends Model
{
    use HasFactory;

    protected $guarded=[];

    public function shop()
    {
        return $this->belongsTo(Shop::class);
    }

    public function product()
    {
        return $this->belongsTo(Product::class);
    }

    static function booted()
    {
        static::addGlobalScope(new ActiveShop);
    }
}
