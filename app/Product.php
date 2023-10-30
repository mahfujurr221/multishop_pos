<?php

namespace App;

use App\Brand;
use App\Image;
use App\PosItem;
use App\Category;
use App\PurchaseItem;
use App\Scopes\ActiveShop;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $guarded = [];

    public function category()
    {
        return $this->belongsTo(Category::class);
    }
    public function brand()
    {
        return $this->belongsTo(Brand::class);
    }

    public function sale()
    {
        return $this->hasMany(PosItem::class);
    }

    public function purchase()
    {
        return $this->hasMany(PurchaseItem::class);
    }

    public function main_unit()
    {
        return $this->belongsTo(Unit::class, 'main_unit_id');
    }

    public function sub_unit()
    {
        return $this->belongsTo(Unit::class, 'sub_unit_id');
    }

    public function sizes()
    {
        return $this->hasMany(ProductSize::class);
    }

    public function colors()
    {
        return $this->hasMany(ProductColor::class);
    }

    public function variations()
    {
        return $this->hasMany(ProductVariation::class);
    }

    //Attribute
    public function getOrderedVariationsAttribute()
    {
        return $this->variations()->orderBy('product_size_id')->orderBy('product_color_id')->get();
    }

    public function shop_product_stocks()
    {
        return $this->hasMany(ShopProductStock::class);
    }

    // CUSTOM

    public function average_cost()
    {
        $items = PurchaseItem::where('product_id', $this->id);

        $number = $items->count();
        // dd($number);
        $total_cost = $items->sum('rate');

        if ($this->opening_stock != 0 && $this->opening_stock != null) {
            $total_cost += $this->cost;
            ++$number;
        }

        $average = 0;
        if ($number != 0) {
            $average = $total_cost / $number;
        }

        if ($average == 0) {
            return $this->cost;
        }

        return $total_cost / $number;
    }



    public function sell_count($start_date = null, $end_date = null, $shop_id = null)
    {

        $sells = PosItem::query();

        if ($shop_id) {
            $sells = PosItem::withoutGlobalScopes()->where('shop_id', $shop_id);
        }

        if ($start_date) {
            $sells = $sells->whereHas('pos', function ($pos) use ($start_date) {
                $pos->where('sale_date', '>=', $start_date);
            });
        }

        if ($end_date) {
            $sells = $sells->whereHas('pos', function ($pos) use ($end_date) {
                $pos->where('sale_date', '<=', $end_date);
            });
        }

        return $sells->where('product_id', $this->id)->sum('qty');
    }


    public function purchase_count($shop_id = null)
    {
        if ($shop_id) {
            return PurchaseItem::withoutGlobalScopes()
                ->where('shop_id', $shop_id)
                ->where('product_id', $this->id)
                ->where('transfer_product_id', null)
                ->sum('qty');
        }
        return PurchaseItem::where('product_id', $this->id)->where('transfer_product_id', null)->sum('qty');
    }

    public function transfer_purchase($shop_id = null)
    {
        if ($shop_id) {
            return PurchaseItem::withoutGlobalScopes()
                ->where('shop_id', $shop_id)
                ->where('product_id', $this->id)
                ->where('transfer_product_id', '!=', '')
                ->sum('qty');
        }
        return PurchaseItem::where('product_id', $this->id)->where('transfer_product_id', '!=', '')->sum('qty');
    }
    //transfer out
    public function transfer_out($shop_id = null)
    {
        $out = ProductTransferItem::join('product_transfers', 'product_transfers.id', '=', 'product_transfer_items.product_transfer_id')
            ->where('product_id', $this->id)
            ->where('product_transfers.by_shop_id', $shop_id)
            ->sum('qty');
        return $out;
    }



    // public function damage_count($shop_id=null)
    // {
    //     if($shop_id){
    //         return Damage::withoutGlobalScopes()->where('shop_id',$shop_id)->where('product_id', $this->id)->where('transfer_product_id',null)->sum('qty');
    //     }
    //     return Damage::where('product_id', $this->id)->where('transfer_product_id',null)->sum('qty');
    // }
    public function damage_count($shop_id = null)
    {
        return Damage::withoutGlobalScopes()->where('shop_id', $shop_id)->where('product_id', $this->id)->sum('qty');
    }
    public function transfer_damage($shop_id = null)
    {
        if ($shop_id) {
            return Damage::withoutGlobalScopes()->where('shop_id', $shop_id)->where('product_id', $this->id)->where('transfer_product_id', '!=', '')->sum('qty');
        }
        return Damage::where('product_id', $this->id)->where('transfer_product_id', '!=', '')->sum('qty');
    }

    public function return_count($shop_id = null)
    {
        if ($shop_id) {
            return ReturnItem::withoutGlobalScopes()->where('shop_id', $shop_id)->where('product_id', $this->id)->sum('qty');
        }

        return ReturnItem::where('product_id', $this->id)->sum('qty');
    }

    public function getStockAttribute()
    {
        // return 0;
        return $this->shop_product_stocks()->first()->stock ?? 0;
    }

    public function stock($shop_id = null)
    {
        // $stock = 0;\
        $stock = $this->purchase_count($shop_id) - $this->sell_count(null, null, $shop_id);
        // Return Count

        // Damage Count
        $stock -= $this->damage_count($shop_id);
        // Transfer Damage Count
        $stock -= $this->transfer_damage($shop_id);

        // return
        $stock += $this->return_count($shop_id);
        //Transfer Purchase
        $stock += $this->transfer_purchase($shop_id);
        // dd($stock);

        return $stock > 0 ? $stock : 0;
    }


    public function update_total_sold()
    {
        $total_sold = $this->sell_count();
        $this->update([
            'total_sold' => $total_sold
        ]);
    }


    public function update_stock($shop_id = null)
    {
        if ($shop_id) {
            $product_stock = Shop::find($shop_id)->get_product_stock($this->id);
            $stock = $this->stock($shop_id);
        } else {
            $product_stock = Shop::find(session('shop'))->get_product_stock($this->id);
            $stock = $this->stock();
        }
        $main_sub_stock = $this->separate_main_sub_qty($stock);
        $product_stock->update([
            'stock' => $stock,
            'main_unit_stock' => $main_sub_stock['main_qty'],
            'sub_unit_stock' => $main_sub_stock['sub_qty'],
        ]);
    }

    public function update_calculated_data()
    {
        $this->update_stock();
        $this->update_total_sold();
    }


    public function separate_main_sub_qty($quantity)
    {
        $main_unit = $this->main_unit;

        $main_qty = 0;
        $main_qty_as_sub = 0;
        $sub_qty = 0;


        if ($quantity != 0 && $main_unit->related_by != null) {
            $main_qty = (int) ($quantity / $main_unit->related_by);
            $main_qty_as_sub = $main_qty * $main_unit->related_by;
            $sub_qty = $quantity - $main_qty_as_sub;
        } else {
            $main_qty = $quantity;
            $sub_qty = 0;
        }

        return [
            'main_qty' => $main_qty,
            'sub_qty' => $sub_qty
        ];
    }


    public function readable_qty($quantity)
    {
        $separated = $this->separate_main_sub_qty($quantity);
        // dd($separated);
        $readable_stock = "";

        $readable_stock .= $separated['main_qty'] . " " . $this->main_unit->name;
        if ($this->sub_unit) {
            $readable_stock .= " " . $separated['sub_qty'] . " " . $this->sub_unit->name;
        }

        return $readable_stock;
        // in units and sub_units
    }

    // Convert all quantity to sub_unit quantity
    public function to_sub_quantity($main_quantity, $sub_quantity)
    {

        $main_unit = $this->main_unit;

        $related_by = 1;
        if ($main_unit->related_by != null) {
            $related_by = $main_unit->related_by;
        }

        return ($main_quantity * $related_by) + $sub_quantity;
    }


    public function calculate_worth($main_qty, $sub_qty, $unit_price)
    {
        $main_unit = $this->main_unit;
        $sub_unit_price = 0;

        if ($main_unit->related_by) {
            $sub_unit_price = $unit_price / $main_unit->related_by;
        }

        $main_price = $main_qty * $unit_price;
        $sub_price = $sub_qty * $sub_unit_price;

        return $main_price + $sub_price;
    }

    public function quantity_worth($qty, $unit_price)
    {
        $separated = $this->separate_main_sub_qty($qty);
        return $this->calculate_worth($separated['main_qty'], $separated['sub_qty'], $unit_price);
    }

    // Don't delete if any relation is existing
    protected static function boot()
    {
        parent::boot();
        static::deleting(function ($rel) {
            $relationMethods = ['sale', 'purchase'];

            foreach ($relationMethods as $relationMethod) {
                if ($rel->$relationMethod()->count() > 0) {
                    return false;
                }
            }
        });
    }

    // static function booted()
    // {
    //     static::addGlobalScope(new ActiveShop);
    // }
}
