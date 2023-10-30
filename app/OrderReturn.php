<?php

namespace App;

use App\Scopes\ActiveShop;
use Illuminate\Database\Eloquent\Model;

class OrderReturn extends Model
{
    protected $guarded = [];

    public function pos()
    {
        return $this->belongsTo(Pos::class);
    }

    public function items()
    {
        return $this->hasMany(ReturnItem::class, 'order_return_id');
    }

    public function payments()
    {
        return $this->morphMany(Payment::class, 'paymentable');
    }

    public function transaction()
    {
        return $this->morphOne(Transaction::class, 'transactable');
    }


    public static function boot()
    {
        parent::boot();

        static::created(function($return){
            // info($return);

            // $return->pos->update_calculated_data(); <----***** This line does not work because of db transaction -> stock data is not insserted in the database when this event is called :/
        });

        static::deleting(function ($return) {
            // dd($return->items);
            // Delete Return Items
            foreach ($return->items as $item) {
                $item->delete();
            }
            // Delete Payments
            $return->payments()->delete();
        });

        static::deleted(function($return){
            $return->pos->update_calculated_data();
            // $return->transaction->delete();
        });
    }

    static function booted()
    {
        static::addGlobalScope(new ActiveShop);
    }

    // Custom Code

    public function paid()
    {
        return $this->payments()->sum('pay_amount');;
    }

}
