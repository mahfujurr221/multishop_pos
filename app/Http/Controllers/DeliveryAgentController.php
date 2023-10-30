<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\DeliveryAgent;

class DeliveryAgentController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $agents = DeliveryAgent::query();
        if ($request->name != null) {
            $agents = $agents->where('name', 'like', '%' . $request->name . '%');
        }

        return view('pages.delivery-agent.index')
            ->with('agents', $agents->get());
    }


    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return view('pages.delivery-agent.create');
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
            'name' => 'required|string|max:191|unique:delivery_agents'
        ]);

        $agent = DeliveryAgent::create($request->all());
        session()->flash('success', 'Created new delivery agent');
        return back();
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
    public function edit(DeliveryAgent $delivery_agent)
    {
        return view('pages.delivery-agent.edit')->with('agent', $delivery_agent);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, DeliveryAgent $delivery_agent)
    {
        $request->validate([
            'name' => 'required|string|max:191|unique:delivery_agents,name,' . $delivery_agent->id,
        ]);

        $delivery_agent->update($request->all());
        session()->flash('success', 'Agent Information Updated.');
        return redirect()->route('delivery-agent.index');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    
    public function destroy(DeliveryAgent $delivery_agent)
    {
        if ($delivery_agent->delete()) {
            session()->flash('success', 'Delivery Agent Update');
            return back();
        }

        session()->flash('warning', 'Ops... Sorry does not deleted.');
        return back();
    }
}
