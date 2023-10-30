@extends('layouts.master')
@section('title', 'Supplier Ledger')

@section('page-header')
<header class="header bg-ui-general">
    <div class="header-info">
        <h1 class="header-title">
            <strong>Supplier Ledger</strong>
        </h1>
    </div>
</header>
@endsection

@section('content')

<div class="col-12">

    <div class="card card-body mb-2">
            <form action="">
                <div class="form-row">
                    <div class="form-group col-4">
                      <select name="supplier_id" id="" class="form-control" data-provide="selectpicker"
                            data-live-search="true" data-size="10">
                                <option value="">Select a Supplier</option>
                            @foreach (\App\Supplier::all() as $item)
                                <option value="{{ $item->id }}" {{ request('supplier_id')==$item->id?"SELECTED":"" }}>{{ $item->name }} {{ $item->phone }}</option>
                            @endforeach
                        </select>
                    </div>

                    <div class="form-group col-md-4">
                        <input type="text" name="start_date" data-provide="datepicker"
                             data-date-today-highlight="true" data-orientation="bottom"
                             data-date-format="yyyy-mm-dd" data-date-autoclose="true" class="form-control"
                             placeholder="Enter Start Date" autocomplete="off" value="{{ request('start_date') }}">
                   </div>

                   <div class="form-group col-md-4">
                        <input type="text" name="end_date" data-provide="datepicker"
                             data-date-today-highlight="true" data-orientation="bottom"
                             data-date-format="yyyy-mm-dd" data-date-autoclose="true" class="form-control"
                             placeholder="Enter End Date" autocomplete="off" value="{{ request('end_date') }}">
                   </div>

                </div>
                <div class="form-row mt-2">
                    <div class="form-group col-12">
                        <button class="btn btn-primary" type="submit">
                            <i class="fa fa-sliders"></i>
                            Filter
                        </button>
                        <a href="{{ request()->url() }}" class="btn btn-info">Reset</a>
                        <a href="" class="btn btn-primary float-right" onclick="window.print()">Print</a>
                    </div>
                </div>

            </form>
        </div>

    {{-- <div class="card card-body">
        <div class="row">
            <div class="col-12">

            </div>
        </div>
    </div> --}}

    <div class="card col-12 print_area">
        {{-- <h4 class="card-title"><strong>Supplier Ledger</strong></h4> --}}

        <div class="card-body card-body-soft p-4">
            <div class="table-responsive-sm">

                @if(request('supplier_id'))
                    @php
                        $supplier = \App\Supplier::find(request('supplier_id'));
                    @endphp
                    <table class="table">
                        <tbody>
                            <tr>
                                <th style="width:30%">Account of:</th>
                                <th>{{ $supplier->name }}</th>
                            </tr>
                            <tr>
                                <th>Address:</th>
                                <th>{{ $supplier->address }}</th>
                            </tr>
                            <tr>
                                <th>Contact No:</th>
                                <th>{{ $supplier->phone }}</th>
                            </tr>
                        </tbody>
                    </table>

                    {{-- <hr> --}}
                    <h3 style="text-align: center;font-weight:bold; margin-top:50px;">Supplier Ledger</h3>

                    <table class="table table-bordered" data-provide="">
                        <thead>
                            <tr class="bg-primary">
                                <th>Date</th>
                                <th>Particulars</th>
                                <th>Debit</th>
                                <th>Credit</th>
                                <th>Balance</th>
                                {{-- <th class="print_hidden">#</th> --}}
                            </tr>
                        </thead>
                        <tbody>
                            {{-- Purchase Items --}}
                            @forelse($transactions as $key => $item)
                            <tr>
                                <td>{{ $item->date }}</td>
                                <td>{{ $item->particulars }}</td>
                                <td>{{ $item->debit }}</td>
                                <td>{{ $item->credit }}</td>
                                <td>{{ $item->balance }}</td>
                            </tr>

                            @empty
                                <tr>
                                    <td colspan="6">
                                        <div class="alert alert-danger" role="alert">
                                            <strong>You have no Transactions</strong>
                                        </div>
                                    </td>
                                </tr>
                            @endforelse
                        </tbody>
                    </table>

                @else
                    <div class="alert alert-danger" role="alert">
                        <strong>Please Select a Supplier</strong>
                    </div>
                @endif
                {{-- {!! $purchases->appends(Request::except("_token"))->links() !!} --}}
            </div>

        </div>
    </div>
</div>

@endsection

@section('styles')
<style>
    table th, table td{
        padding:5px !important;
    }
</style>
<style>
    @media print{
        table,table th,table td{
            color:black !important;
        }
    }
</style>
@endsection

@section('scripts')
@include('includes.delete-alert')
<script>

</script>
@endsection
