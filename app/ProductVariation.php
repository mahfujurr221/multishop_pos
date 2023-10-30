<?php

namespace App;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductVariation extends Model
{
    use HasFactory;

      protected $guarded = [];

    public function product()
    {
        return $this->belongsTo(Product::class);
    }

    
    public function product_color()
    {
        return $this->belongsTo(ProductColor::class);
    }

    public function product_size()
    {
        return $this->belongsTo(ProductSize::class);
    }

    public function pos_items()
    {
        return $this->hasMany(PosItem::class);
    }

    public function purchase_items()
    {
        return $this->hasMany(PurchaseItem::class);
    }

    public function damages()
    {
        return $this->hasMany(Damage::class);
    }

    public function return_items()
    {
        return $this->hasMany(ReturnItem::class);
    }

    /****** CUSTOM FUNCTIONS ******/

    public function stock()
    {
        // return 0;
        // purhcase-stock=final stock
        $purchased = $this->purchase_items()->sum('qty');
        $sold = $this->pos_items()->sum('qty');
        // return damage

        $returned=$this->return_items()->sum('qty');
        $damaged=$this->damages()->sum('qty');

        return $purchased - $sold - $damaged + $returned;
    }


    public function getNameAttribute()
    {
        $size=$this->product_size->size??'';
        $color = $this->product_color->color??'';
        return  $size ." - ".  $color;
    }
}
