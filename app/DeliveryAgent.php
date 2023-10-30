<?php

namespace App;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DeliveryAgent extends Model
{
    use HasFactory;

    protected $guarded = [];

    public function sales()
    {
        return $this->hasMany(Pos::class, 'delivery_agent_id');
    }
    // Don't delete if any relation is existing
    protected static function boot()
    {
        parent::boot();
        static::deleting(function ($telco) {
            $relationMethods = ['sales'];
            foreach ($relationMethods as $relationMethod) {
                if ($telco->$relationMethod()->count() > 0) {
                    return false;
                }
            }
        });
    }
}
