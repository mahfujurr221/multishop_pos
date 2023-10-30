@extends('layouts.master')
@section('title', 'Delivery Agents ')

@section('page-header')
<header class="header bg-ui-general">
    <div class="header-info">
        <h1 class="header-title">
            <strong>Delivery Agents </strong>
        </h1>
    </div>

    <div class="header-action">
        <nav class="nav">
            <a class="nav-link active" href="{{ route('delivery-agent.index') }}">
                Delivery Agents
            </a>
            <a class="nav-link" href="{{ route('delivery-agent.create') }}">
                <i class="fa fa-plus"></i>
                New Delivery Agent
            </a>
        </nav>
    </div>
</header>
@endsection

@section('content')
<div class="col-12">

    <div class="card card-body mb-2">
        <form action="">
            <div class="form-row">
                <div class="form-group col-md-4">
                    <input type="text" class="form-control" name="name" value="{{ request()->name }}"
                        placeholder="Name">
                </div>
            </div>
            <div class="form-row mt-2">
                <div class="form-group float-right">
                    <button class="btn btn-primary" type="submit">
                        <i class="fa fa-sliders"></i>
                        Filter
                    </button>
                    <a href="{{ request()->url() }}" class="btn btn-info">Reset</a>
                </div>
            </div>
        </form>
    </div>

    <div class="card">
        <h4 class="card-title"><strong>Delivery Agents</strong></h4>

        <div class="card-body card-body-soft p-4">
            @if($agents->count() > 0)
            <div class="table-responsive">
                <table class="table table-bordered" data-provide="datatables">
                    <thead>
                        <tr class="bg-primary">
                            <th>#</th>
                            <th>Name</th>
                            <th>Sale Amount</th>
                            <th>Paid Amount</th>
                            <th>Due Amount</th>
                            <th>Address</th>
                            <th>#</th>
                        </tr>
                    </thead>
                    <tbody>
                        @foreach($agents as $key => $agent)
                        <tr>
                            <th scope="row">{{ ++$key }}</th>
                            <td>{{ $agent->name }}</td>
                            <td>{{ number_format($agent->sales->sum('final_receivable'), 2) }} Tk</td>
                            <td>{{ number_format($agent->sales->sum('paid'), 2) }} Tk</td>
                            <td>{{ number_format($agent->sales->sum('due'), 2) }} Tk</td>
                            <td>{!! $agent->address !!}</td>

                            <td>
                                <div class="btn-group">
                                    <button class="btn btn-primary dropdown-toggle" data-toggle="dropdown"
                                        aria-expanded="false">
                                        <i class="fa fa-cogs"></i>
                                    </button>
                                    <div class="dropdown-menu" x-placement="bottom-start">
                                        <a class="dropdown-item" href="{{ route('delivery-agent.edit', $agent->id) }}">
                                            <i class="fa fa-edit"></i>
                                            Edit
                                        </a>
                                        {{-- <a class="dropdown-item" href="{{ route('delivery-agent.show', $agent->id) }}">
                                        <i class="fa fa-file-excel-o"></i>
                                        Report
                                        </a> --}}
                                        <a class="dropdown-item" href="#"
                                            onclick="deleteHandle('{{ route('delivery-agent.destroy', $agent->id) }}')">
                                            <i class="fa fa-trash"></i>
                                            Delete
                                        </a>
                                    </div>
                                </div>
                            </td>
                        </tr>
                        @endforeach

                    </tbody>
                </table>

            </div>
            @else
            <div class="alert alert-danger" role="alert">
                <strong>You have no delievery agents </strong>
            </div>
            @endif
        </div>
    </div>
</div>

@endsection

@section('styles')

@endsection

@section('scripts')

@endsection