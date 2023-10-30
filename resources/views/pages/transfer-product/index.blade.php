@extends('layouts.master')
@section('title', 'Product Transfers List')

@section('page-header')
    <header class="header bg-ui-general">
        <div class="header-info">
            <h1 class="header-title">
                <strong>Product Transfers</strong>
            </h1>
        </div>


        <div class="header-action">
            <nav class="nav">
                <a class="nav-link active" href="{{ route('product-transfer.index') }}">
                    Product Transfers
                </a>
                <a class="nav-link" href="{{ route('product-transfer.create') }}">
                    <i class="fa fa-plus"></i>
                    New Product Transfers
                </a>
            </nav>
        </div>
    </header>
@endsection

@section('content')
    <div class="col-12" style="">
        <div class="card card-body mb-2">
            <form action="#">
                <div class="form-row">
                    <div class="form-group col-md-3">
                        <input type="text"
                               class="form-control" name="bill_no" placeholder="Bill Number" autocomplete="off" value="{{ request('bill_no') }}">
                    </div>
                    <div class="form-group col-md-3">
                        <input type="text" data-provide="datepicker" data-date-today-highlight="true"
                               data-orientation="bottom" data-date-format="yyyy-mm-dd" data-date-autoclose="true"
                               class="form-control" name="start_date" placeholder="Start Date" autocomplete="off" value="{{ request('start_date') }}">
                    </div>
                    <div class="form-group col-md-3">
                        <input type="text" data-provide="datepicker" data-date-today-highlight="true"
                               data-orientation="bottom" data-date-format="yyyy-mm-dd" data-date-autoclose="true"
                               class="form-control" name="end_date" placeholder="End Date" autocomplete="off" value="{{ request('end_date') }}">
                    </div>

 
                    <div class="form-group col-md-3">
                        <select name="product_id" id="" class="form-control" data-provide="selectpicker"
                                data-live-search="true" data-size="10">
                            <option value="">Select Product</option>
                            @foreach ($products as $item)
                                <option value="{{ $item->id }}" {{ request('product_id')==$item->id?'SELECTED':'' }}>{{ $item->name .' - '. $item->code }}</option>
                            @endforeach
                        </select>
                    </div>

                </div>
                <div class="form-row mt-2">
                    <div class="form-group col-12">
                        <button class="btn btn-primary" type="submit">
                            <i class="fa fa-sliders"></i>
                            Filter
                        </button>
                        <a href="{{ route('product-transfer.index') }}" class="btn btn-info">Reset</a>
                        <a href="" class="btn btn-primary pull-right" onclick="window.print()">Print</a>
                    </div>
                </div>
            </form>
        </div>


        <div class="card print_area">
            <h4 class="card-title"><strong>Product Transfers</strong></h4>

            <div class="card-body">
                @if($product_transfers->count() > 0)
                    <div class="">
                        <table class="table table-responsive table-bordered" data-provide="">
                            <thead>
                            <tr class="bg-primary">
                                <th>#</th>
                                <th>Invoice No.</th>
                                <th>Transfer Shop Name</th>
                                <th>Transfer By</th>
                                <th>Items</th>
                                <th>Date</th>
                                <th>Status</th>
                                <th class="print_hidden">Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                            @foreach($product_transfers as $key => $transfer)
                                <tr>
                                    <td>{{ (isset($_GET['page']))? ($_GET['page']-1)*$product_transfers->count()+$key+1 : $key+1 }}</td>
                                    <td>{{ $transfer->id }}</td>
                                    <td>{{ $transfer->transferred_shop->name }}</td>
                                    <td>{{ $transfer->transferred_by->name()  }}</td>
                                    <td>
                                        <ul class="product-list">
                                            @foreach ($transfer->items()->with('product')->get() as $item)
                                                @php
                                                    $product=$item->product;
                                                @endphp
                                                
                                                @if($product)
                                                <li>{{ $product->name." Code: ".$product->code."  *".$product->readable_qty($item->qty) }}</li>
                                                @endif
                                            @endforeach
                                        </ul>
                                    </td>
                                    <td>{{ date('d M, Y', strtotime($transfer->transfer_date)) }}</td>
 
                                    <td>
                                        @if($transfer->status ==1)
                                            <span class="badge badge- pill badge-success">Accept</span>
                                        @else
                                            <span class="badge badge- pill badge-info">Pending</span>
                                        @endif
                                    </td>
                                    <td class="print_hidden">
                                        <div class="btn-group">
                                            <button class="btn btn-primary dropdown-toggle" data-toggle="dropdown"
                                                    aria-expanded="false">
                                                <i class="fa fa-cogs"></i>
                                            </button>
                                            <div class="dropdown-menu" x-placement="bottom-start">
                                                {{-- @can('show-product-transfer')
                                                <a class="dropdown-item" href="{{ route('product-transfer', $transfer->id) }}">
                                                    <i class="fa fa-print text-primary"></i>
                                                    Print
                                                </a>
                                                @endcan
                                                @can('edit-product-transfer')
                                                <a class="dropdown-item" href="{{ route('product-transfer.edit', $transfer->id) }}">
                                                    <i class="fa fa-pencil-square-o text-warning"></i>
                                                    Edit
                                                </a>
                                                @endcan --}}
                                                @can('delete-product-transfer')
                                                    <a class="dropdown-item delete" href="{{ route('product-transfer.destroy',$transfer->id) }}">
                                                        <i class="fa fa-trash text-danger"></i>
                                                        Delete
                                                    </a>
                                                @endcan
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            @endforeach

                            </tbody>
        
                        </table>
                        {!! $product_transfers->appends(Request::except("_token"))->links() !!}
                    </div>
                @else
                    <div class="alert alert-danger text-center" role="alert">
                        <strong>You have no Product Transfers List </strong>
                    </div>
                @endif
            </div>
        </div>
    </div>
@endsection

@section('styles')
    <style>
        .top-summary td{
                width:12.5%;
                font-size:1.5em;
                vertical-align: middle !important;
        }

        .table td,
        .table th {
            padding: 7px;
            vertical-align: baseline;
            border-top: 1px solid #e9ecef;
            text-align: center;
        }

        .card {
            margin-bottom: 0px;
        }

        .card-body {
            padding: 15px;
        }

        .center-cell-text {
            text-align: center;
            vertical-align: middle;
        }

        .table-cell {
            display: table-cell;
            min-height: 126px;
        }


        .product-list li {
            text-align: left;
        }

    </style>

@endsection

@section('scripts')
    @include('includes.delete-alert')
    @include('includes.placeholder_model')
    <script src="{{ asset('js/modal_form.js') }}"></script>
@endsection
