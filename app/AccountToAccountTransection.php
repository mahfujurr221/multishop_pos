<?php

namespace App;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;

class AccountToAccountTransection extends Model
{
    protected $guarded = [];

    public function from_account()
    {
        return $this->belongsTo(BankAccount::class, 'from');
    }

    public function to_account()
    {
        return $this->belongsTo(BankAccount::class, 'to');
    }

    // public function scopeActiveShop($query)
    // {
    //     return $query->where(function($query){
    //         $query->whereHas('from_account',function($account){
    //             $account->where('shop_id',session('shop'));
    //         })->orWhereHas('to_account',function($account){
    //             $account->where('shop_id',session('shop'));
    //         });
    //     });
    // }

    static function booted()
    {
        static::addGlobalScope('activeShop', function (Builder $builder) {
            $builder->where(function($query){
                $query->whereHas('from_account',function($account){
                    $account->where('shop_id',session('shop'));
                })->orWhereHas('to_account',function($account){
                    $account->where('shop_id',session('shop'));
                });
            });
        });
    }
}
