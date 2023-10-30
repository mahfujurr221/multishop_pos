<?php

namespace App\Http\Controllers;

use App\AccountToAccountTransection;
use Illuminate\Http\Request;

class AccountToAccountTransectionController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $transections = AccountToAccountTransection::activeShop()->paginate(20);
        return view("pages.account_to_account.index", compact('transections'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\AccountToAccountTransection  $accountToAccountTransection
     * @return \Illuminate\Http\Response
     */
    public function show(AccountToAccountTransection $accountToAccountTransection)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\AccountToAccountTransection  $accountToAccountTransection
     * @return \Illuminate\Http\Response
     */
    public function edit(AccountToAccountTransection $accountToAccountTransection)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\AccountToAccountTransection  $accountToAccountTransection
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, AccountToAccountTransection $accountToAccountTransection)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\AccountToAccountTransection  $accountToAccountTransection
     * @return \Illuminate\Http\Response
     */
    public function destroy($accountToAccountTransection)
    {
        $transection = AccountToAccountTransection::find($accountToAccountTransection);

        if ($transection->delete()) {

            session()->flash('success', 'Deleted successfully!');
        } else {
            session()->flash('warning', 'Deletion Failed!');
        }

        return redirect()->back();
    }
}
