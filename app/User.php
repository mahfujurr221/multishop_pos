<?php

namespace App;

use App\Role;
use App\Profile;
use Illuminate\Notifications\Notifiable;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Spatie\Permission\Traits\HasRoles;

class User extends Authenticatable
{
    use Notifiable,HasRoles;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'fname', 'lname', 'email', 'password', 'avatar','shop_id', 'is_default'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function profile()
    {
        return $this->hasOne(Profile::class);
    }

     public function name()
    {
        return $this->fname . ' ' . $this->lname;
    }

    public function sales()
    {
        return $this->hasMany(Pos::class,'sale_by');
    }


    // public function role()
    // {
    //     return $this->belongsTo(Role::class);
    // }

    public function shop()
    {
        return $this->belongsTo(Shop::class);
    }

    public function sales_amount(){
        return $this->sales()->sum('final_receivable');
    }


    // public function hasAnyRole($roles)
    // {
    //     // dd($roles);
    //     if (is_array($roles)) {
    //         foreach ($roles as $role) {
    //             if ($this->hasRole($role)) {
    //                 return true;
    //             }
    //         }
    //     } else {
    //         if ($this->hasRole($roles)) {
    //             return true;
    //         }
    //     }
    //     return false;
    // }

    // public function hasRole($role)
    // {
    //     if ($this->role()->where("name", $role)->first()) {
    //         return true;
    //     }
    //     return false;
    // }


}
