<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\ActualPayment;
use App\Scopes\ActiveShop;

class Payment extends Model
{
    protected $guarded = [];

    /**
     * Relations
     */
    public function paymentable()
    {
        return $this->morphTo();
    }

    public function payment_method()
    {
        return $this->belongsTo(PaymentMethod::class, 'method');
    }

    public function pos()
    {
        return $this->belongsTo(Pos::class, 'paymentable_id', 'id');
    }

    public function purchase()
    {
        return $this->belongsTo(Purchase::class, 'paymentable_id', 'id');
    }

    public function supplier()
    {
        return $this->belongsTo(Supplier::class, 'paymentable_id', 'id');
    }

    public function customer()
    {
        return $this->belongsTo(Customer::class, 'paymentable_id', 'id');
    }

    public function actual_payment()
    {
        return $this->belongsTo(ActualPayment::class, 'actual_payment_id', 'id');
    }



    protected static function boot(){
        parent::boot();

        static::saved(function($payment){
            if($payment->paymentable){
                $payment->paymentable->update_calculated_data();
                if($payment->paymentable_type==Purchase::class){
                    $payment->paymentable->supplier->update_calculated_data();
                }

                if($payment->paymentable_type==Pos::class){
                    // info('Pos Payment Created');
                    // $payment->paymentable->update_calculated_data();
                    $payment->paymentable->customer?$payment->paymentable->customer->update_calculated_data():null;
                }
            }

        });

        static::deleted(function($payment){
            $payment->actual_payment->update_amount();

            if($payment->paymentable){
                $payment->paymentable->update_calculated_data();
            }
            if($payment->paymentable&&$payment->paymentable_type==Purchase::class){
                $payment->paymentable->supplier->update_calculated_data();

            }

            if($payment->paymentable&&$payment->paymentable_type==Pos::class){
                // $payment->paymentable->update_calculated_data();
                $payment->paymentable->customer?$payment->paymentable->customer->update_calculated_data():null;
            }

            // $payment->transaction->delete();
        });
    }

    static function booted()
    {
        static::addGlobalScope(new ActiveShop);
    }
}
