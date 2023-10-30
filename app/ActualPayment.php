<?php

namespace App;

use App\Scopes\ActiveShop;
use App\Services\TransactionService;
use Illuminate\Database\Eloquent\Model;

class ActualPayment extends Model
{
    protected $guarded = [];
    protected static $relations_to_cascade = ['payments'];

    public function payments()
    {
        return $this->hasMany(Payment::class);
    }



    public function customer()
    {
        return $this->belongsTo(Customer::class);
    }

    public function supplier()
    {
        return $this->belongsTo(Supplier::class, 'supplier_id');
    }

    public function transaction()
    {
        return $this->morphOne(Transaction::class, 'transactable');
    }


    public function update_amount(){
        if($this->payments()->first()){
            $this->update(['amount'=>$this->payments()->sum('pay_amount')]);
        }else{
            $this->delete();
        }
    }

    protected static function boot()
    {
        parent::boot();

        static::created(function($actual_payment){
            // info($actual_payment);
            TransactionService::create_payment_transaction($actual_payment->id);
        });

        static::deleting(function ($actual_payment) {
            foreach (static::$relations_to_cascade as $relation) {
                foreach ($actual_payment->{$relation}()->get() as $item) {
                    $item->delete();
                }
            }
            if($actual_payment->transaction){
                $actual_payment->transaction->delete();
            }
        });

        // static::restoring(function ($resource) {
        //     foreach (static::$relations_to_cascade as $relation) {
        //         foreach ($resource->{$relation}()->get() as $item) {
        //             $item->withTrashed()->restore();
        //         }
        //     }
        // });
    }

    static function booted()
    {
        static::addGlobalScope(new ActiveShop);
    }

}
