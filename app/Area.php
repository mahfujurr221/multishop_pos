<?php

namespace App;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Area extends Model
{
    use HasFactory;

    protected $guarded = [];

    public function orders()
    {
        return $this->hasMany(Pos::class, 'area_id');
    }

    // Don't delete if any relation is existing
    protected static function boot()
    {
        parent::boot();
        static::deleting(function ($telco) {
            $relationMethods = ['orders'];
            foreach ($relationMethods as $relationMethod) {
                if ($telco->$relationMethod()->count() > 0) {
                    return false;
                }
            }
        });
    }
}
