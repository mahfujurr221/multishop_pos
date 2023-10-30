<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use App\User;
class CheckShop
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $request, Closure $next)
    {
        $user = auth()->user();
        // dd("HEllO");
        if(Auth::user()->getRoleNames()->first() == 'admin'){
            // dd(session('test'));
            if(session('shop')==null){
                session(['shop'=>1]);
                session()->flash('success','Default Shop Selected!');
            }
        }else{
            // set user branch
            // dd("HERE");
            if(session('shop')==null){
                session(['shop'=>$user->shop_id]);
            }
        }
        // dd("HERE");
        return $next($request);

    }
}
