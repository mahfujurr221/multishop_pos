@extends('layouts.master')
@section('title', 'Online Sales List')

@section('page-header')
<header class="header bg-ui-general">
    <div class="header-info">
        <h1 class="header-title">
            <strong>Sale</strong>
        </h1>

    </div>

    <div class="header-action">
        <nav class="nav">
            <a class="nav-link active" href="{{ route('sales.online') }}">
                Online Sales
            </a>
            <a class="nav-link" href="{{ route('pos.create') }}">
                <i class="fa fa-plus"></i>
                New Sale
            </a>
        </nav>
    </div>
</header>
@endsection

@section('content')
<div class="col-12" style="">
    <div class="card card-body mb-2">
        <form action="">
            <div class="form-row">
                <div class="form-group col-md-3">
                    <input type="text" class="form-control" name="bill_no" placeholder="Bill Number" autocomplete="off"
                        value="{{ request('bill_no') }}">
                </div>
                <div class="form-group col-md-3">
                    <input type="text" data-provide="datepicker" data-date-today-highlight="true"
                        data-orientation="bottom" data-date-format="yyyy-mm-dd" data-date-autoclose="true"
                        class="form-control" name="start_date" placeholder="Start Date" autocomplete="off"
                        value="{{ request('start_date') }}">
                </div>
                <div class="form-group col-md-3">
                    <input type="text" data-provide="datepicker" data-date-today-highlight="true"
                        data-orientation="bottom" data-date-format="yyyy-mm-dd" data-date-autoclose="true"
                        class="form-control" name="end_date" placeholder="End Date" autocomplete="off"
                        value="{{ request('end_date') }}">
                </div>
                <div class="form-group col-md-3">
                    <select name="customer" id="" class="form-control" data-provide="selectpicker"
                        data-live-search="true" data-size="12">
                        <option value="">Select Customer</option>
                        @foreach ($customers as $item)
                        <option {{ request('customer')==$item->id ? 'selected' : '' }} value="{{ $item->id }}">
                            {{ $item->name }}</option>
                        @endforeach
                    </select>
                </div>
            </div>
            <div class="row">
 
                <div class="form-group col-md-3">
                    <select name="delivery_man" id="" class="form-control" data-provide="selectpicker"
                        data-live-search="true">
                        <option value="">Select Delivery Agent</option>
                        @foreach ($delivery_methods as $method)
                        <option {{ request('delivery_method')==$method->id ? 'selected' : '' }} value="{{ $method->id
                            }}">
                            {{ $method->name }}</option>
                        @endforeach
                    </select>
                </div>
                <div class="form-group col-md-3">
                    <select name="order_status" id="" class="form-control" data-provide="selectpicker"
                        data-live-search="true">
                        <option value="">Select Order Status </option>
                        @foreach ($order_status_list as $order_status)
                        <option {{ request('order_status')==$order_status->id ? 'selected' : '' }}
                            value="{{ $order_status->id }}">{{ $order_status->name }}</option>
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
                    <a href="{{ route('sales.online') }}" class="btn btn-info">Reset</a>
                    <a href="" class="btn btn-primary pull-right" onclick="window.print()">Print</a>
                </div>
            </div>
        </form>
    </div>


    <div class="card print_area">
        <h4 class="card-title"><strong>Sale</strong></h4>

        <div class="card-body">
            @if($sales->count() > 0)
            <div class="table-responsive">
                <table class="table table-sm table-bordered">
                    <thead>
                        <tr class="bg-primary">
                            <th>#</th>
                            <th style="min-width: 100px;">Customer</th>
                            <th style="min-width: 250px;">Items</th>
                            <th style="min-width: 100px">Date</th>
                            <th>Delivery Agent</th>
                            <th>Delivery Area</th>
                            <th style="min-width: 100px;">Receivable</th>
                            <th style="min-width: 100px;">Total Pay</th>
                            <th style="min-width: 100px;">Due</th>
                            <th style="min-width: 100px;">Delivery note</th>
                            <th>Status</th>
                            <th style="min-width: 120px;">Ord. Status </th>
                            <th class="print_hidden">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        @foreach($sales as $key => $sale)
                        <tr>
                            <td>{{ (isset($_GET['page']))? ($_GET['page']-1)*$sales->count()+$key+1 : $key+1 }}</td>
                            <td>
                                {{ $sale->customer ? $sale->customer->name : 'Walking Customer' }}
                            </td>
                            <td style="width: 220px">
                                <ul class="product-list">
                                    @foreach ($sale->items as $item)
                                    <li>{{ $item->product->name." Code: ".$item->product->code." *".$item->qyt }}</li>
                                    @endforeach
                                </ul>
                            </td>
                            <td>{{ date('d M, Y', strtotime($sale->sale_date)) }}</td>
                            <td>{{ $sale->delivery_agent->name ??'' }}</td>
                            <td>{{ $sale->area->name ??'' }}</td>
                            <td>{{ number_format(round($sale->receivable), 1) }} Tk</td>
                            <td>{{ number_format($paid=$sale->paid + $sale->delivery_charge),1 }} Tk</td>
                            <td>{{ number_format($sale->due) }} Tk</td>
                            <td>
                                {!! $sale->action_note ? $sale->action_note : 'No Note' !!}
                            </td>
                            <td>{{ $sale->receivable <= $sale->paid ? 'PAID' : 'UNPAID' }}
                            <td>
                                <select id="order_status" class="form-control order_status">
                                    @foreach ($order_status_list as $status)
                                    <option {{ $status->id == $sale->order_status ? 'selected' : '' }}
                                        value="{{ $status->id }}" data="{{ $sale->id }}">{{ $status->name }}</option>
                                    @endforeach
                                </select>
                            </td>

                            <td class="print_hidden">
                                <div class="btn-group">
                                    <button class="btn btn-primary dropdown-toggle" data-toggle="dropdown"
                                        aria-expanded="false">
                                        <i class="fa fa-cogs"></i>
                                    </button>
                                    <div class="dropdown-menu" x-placement="bottom-start">
                                        @can('pos_receipt')
                                        <a class="dropdown-item" href="{{ route('pos_online_sale_receipt', $sale->id) }}">
                                            <i class="fa fa-print text-primary"></i>
                                            Print
                                        </a>
                                        @endcan

                                        @can('chalan_receipt')
                                        <a class="dropdown-item" href="{{ route('chalan_receipt', $sale->id) }}">
                                            <i class="fa fa-print text-primary"></i>
                                            Chalan Print
                                        </a>
                                        @endcan
                                        @can('edit-pos')
                                        <a class="dropdown-item" href="{{ route('pos.edit', $sale->id) }}">
                                            <i class="fa fa-pencil-square-o text-warning"></i>
                                            Edit
                                        </a>
                                        @endcan
                                        @can('show-pos')
                                        <a class="dropdown-item" href="{{ route('pos.show', $sale->id) }}">
                                            <i class="fa fa-desktop text-info"></i>
                                            Show
                                        </a>
                                        @endcan

                                        @can('pos-add_payment')
                                          <a href="{{ route("pos.add_payment",$sale->id) }}" class="edit dropdown-item"
                                            data-toggle="modal" data-target="#edit" id="Add Payment">
                                            <i class="fa fa-money text-primary"></i>
                                            Add Payment
                                        </a>
                                        @endcan
                                        @can('pos_return')
                                        <a class="dropdown-item" href="{{ route('pos.return', $sale->id) }}">
                                            <i class="fa fa-backward text-primary"></i>
                                            Return
                                        </a>
                                        @endcan
                                        @can('pos_return_list')
                                        <a class="dropdown-item"
                                            href="{{ route('return.index') }}?pos_id={{ $sale->id }}">
                                            <i class="fa  fa-backward text-primary"></i>
                                            Return List
                                        </a>
                                        @endcan
                                        @can('delete-pos')
                                         <a class="dropdown-item delete" href="{{ route('pos.destroy',$sale->id) }}">
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
                    {{-- <tfoot>
                        <tr class="bg-dark">
                            <th colspan="5"></th>
                            <th colspan="2"><strong>Payable :
                                    Tk</strong></th>
                            <th colspan="2">
                                <strong>Received :
                                    Tk</strong>
                            </th>
                            <th colspan="2">
                                <strong>
                                    DUE :
                                   
                                    Tk
                                </strong>
                            </th>
                            <th colspan="4"></th>

                        </tr>
                    </tfoot> --}}
                </table>
                {!! $sales->appends(Request::except("_token"))->links() !!}
            </div>
            @else
            <div class="alert alert-danger text-center" role="alert">
                <strong>You have no Sales List </strong>
            </div>
            @endif
        </div>
    </div>
</div>

@endsection

@section('styles')
<style>
    .table td,
    .table th {
        padding: 7px;
        vertical-align: baseline;
        border-top: 1px solid #e9ecef;
        text-align: center;
    }

    .table-responsive {
        overflow: auto;
        min-height: 500px;
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
        font-size: 10px;
        line-height: 18px;
    }

    .product-list {
        padding-left: 15px;
    }
</style>

<style>
    @media print {
        body header {
            display: none !important;
        }

        .print_area {
            position: absolute;
            top: 0;
        }

        .print_area * {
            visibility: visible !important;
        }

        .print_hidden {
            display: none;
        }
    }
</style>
@endsection

@section('scripts')
@include('includes.delete-alert')
@include('includes.placeholder_model')
<script src="{{ asset('js/modal_form.js') }}"></script>
<script>
      $(document).on("change",'.order_status' ,function () {
            let status_id = $(this).val();
            let posId = $(this).find(':selected').attr('data');
            let url = "{{ route('change.order_status') }}";
            $.get(url, {status: status_id, pos_id: posId}).then(function (data) {
                if(data.status == 'ok') {
                    toastr.success('Order status successfully update.');
                } else {
                    toastr.error(data.status);
                }
            });
        });
</script>
@endsection