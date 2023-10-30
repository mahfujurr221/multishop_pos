<?php

namespace App;

use App\Scopes\ActiveShop;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Owner extends Model
{
    // use HasFactory;

    protected $guarded=[];

    public function transections()
    {
        return $this->hasMany(AccountToAccountTransection::class,'owner_id');
    }


    public function invested()
    {
        return $this->transections()->whereNull('from')->sum('amount');
    }

    public function withdrawn()
    {
        return $this->transections()->whereNull('to')->sum('amount');
    }

    // static function booted()
    // {
    //     static::addGlobalScope(new ActiveShop);
    // }
    
    protected static function boot()
    {
        parent::boot();
        static::deleting(function ($rel) {
            $relationMethods = ['transections'];

            foreach ($relationMethods as $relationMethod) {
                if ($rel->$relationMethod()->count() > 0) {
                    return false;
                }
            }
        });
    }
}
