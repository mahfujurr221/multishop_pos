<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Area;

class AreaController extends Controller
{

    public function __construct()
    {
        $this->middleware('can:create-area',  ['only' => ['create', 'store']]);
        $this->middleware('can:edit-area',  ['only' => ['edit', 'update']]);
        $this->middleware('can:delete-area', ['only' => ['destroy']]);
        $this->middleware('can:list-area', ['only' => ['index']]);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $area_list = Area::orderBy('name', 'asc')->paginate(15);
        return view('pages.area.index')->with('area_list', $area_list);
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
        $request->validate([
            'name' => 'required|string|max:191|unique:areas',
            'delivery_charge' => 'required|numeric'
        ]);
        $area = Area::create([
            'name' => $request->name,
            'delivery_charge' => $request->delivery_charge,
        ]);

        session()->flash('success', 'New area added...');

        return redirect()->back();
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $area = Area::findOrFail($id);
        $area_list = Area::orderBy('name', 'asc')->paginate(15);
        return view('pages.area.index')->withArea($area)->with('area_list', $area_list);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $area = Area::findOrFail($id);
        $request->validate([
            'name' => 'required|string|max:191|unique:areas,name,' . $area->id,
            'delivery_charge' => 'required|numeric'
        ]);
        $area->update([
            'name' => $request->name,
            'delivery_charge' => $request->delivery_charge
        ]);

        session()->flash('success', 'Area update success...');

        return redirect()->back();
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    
    public function destroy($id)
    {
         $area = Area::findOrFail($id);

        if ($area->default) {
            session()->flash('warning', 'Ops sorry. doese not deleted.');
            return back();
        }
        if ($area->delete()) {
            session()->flash('success', 'Area Delete success...');
            return redirect()->back();
        }

        session()->flash('warning', 'Area do not delete...');
        return redirect()->back();
    }

    public function getDeliveryCharge(Area $area){
        return $area;
    }
}
