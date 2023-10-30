<?php

namespace App;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductTransfer extends Model
{
    use HasFactory;

    protected $guarded = [];

    public function product()
    {
        return $this->belongsTo(Product::class);
    }

    public function transferred_by()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function received_by_user()
    {
        return $this->belongsTo(User::class, 'received_by');
    }

    public function transferred_shop()
    {
        return $this->belongsTo(Shop::class, 'shop_id');
    }

     public function items()
    {
        return $this->hasMany(ProductTransferItem::class,'product_transfer_id');
    }

        public function filter($request, $product_transfers)
    {
        if ($request->start_date) {
            $product_transfers = $product_transfers->whereDate('transfer_date', '>=' ,$request->start_date);
        }

        if($request->end_date){
            $product_transfers = $product_transfers->whereDate('transfer_date', '<=', $request->end_date);
        }
   
        if ($request->bill_no) {
            $product_transfers = $product_transfers->where('id', $request->bill_no);
        }

        if($request->product_id){
            $product_transfers = $product_transfers->whereHas('items',function($items)use($request){
                $items->where('product_id',$request->product_id);
            });
        }

        return $product_transfers;
    }
    

}
