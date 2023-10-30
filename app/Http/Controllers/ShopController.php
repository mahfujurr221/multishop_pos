<?php

namespace App\Http\Controllers;

use App\Helpers\InputHelper;
use App\Role;
use App\Shop;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class ShopController extends CrudController
{
    private $logo;
    private $path;

    public function __construct()
    {
        $this->path = 'dashboard/images/logos/';
        $this->logo = 'dashboard/images/Final-Logo03.png';
        $this->mini_logo = 'dashboard/images/logo-light-lg.png';

        $this->middleware('can:create-shop',  ['only' => ['create', 'store']]);
        $this->middleware('can:edit-shop',  ['only' => ['edit', 'update']]);
        $this->middleware('can:delete-shop', ['only' => ['destroy']]);
        $this->middleware('can:list-shop', ['only' => ['index']]);
    }

    protected $model = Shop::class;
    protected $view_path = "pages.shops";
    protected $route = 'shops';


    public function store(Request $request)
    {
        $validated=$request->validate([
            'name' => 'required|string|max:255',
            'address'=>"required|string|max:500",
            'email' => 'email|max:255',
            'phone' => 'required|max:191'
        ]);


        if(Shop::count()>=config('softghor.shop_limit')){
            throw ValidationException::withMessages(['name'=>'Can\'t create any more shop. Please contact sales/support.']);

        }



        $validated['logo'] = $this->logo;
        if ($request->hasFile('logo')) {
            if (env('APP_MODE') == 'demo') {
                session()->flash('error', 'Image Upload is disabled in demo.');
            }else{
                $logo = InputHelper::upload($request->logo, $this->path);
                $validated['logo'] = $logo;
            }
        }

        Shop::create($validated);

        session()->flash('success', 'Created Successfully!');

        return redirect()->route($this->route.".index");
    }

    public function update(Request $request, $id)
    {
        $validated=$request->validate([
            'name' => 'required|string|max:255',
            'address'=>"required|string|max:500",
            'email' => 'email|max:255',
            'phone' => 'required|max:191'
        ]);

        $shop=Shop::find($id);

        $validated['logo'] = $this->logo;
        if ($request->hasFile('logo')) {
            if (env('APP_MODE') == 'demo') {
                session()->flash('error', 'Image Upload is disabled in demo.');
            }else{
                if ($shop->logo != $this->logo) {
                    InputHelper::delete($shop);
                }
                $logo = InputHelper::upload($request->logo, $this->path);
                $validated['logo'] = $logo;
            }
        }

        $shop->update($validated);

        session()->flash('success', 'Updated Successfully!');

        return back();
        // return redirect()->route($this->route.".index");
    }

    public function change_active(Request $request)
    {
        if(!Auth::user()->getRoleNames()->first() == 'admin'){
            abort(403);
        }

        session(['shop'=>$request->shop_id]);
        return back();
    }
}
