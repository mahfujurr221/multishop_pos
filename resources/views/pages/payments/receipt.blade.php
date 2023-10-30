@extends('layouts.master')
@section('title', 'Payment Receipt')


@section('content')
    <div class="col-md-12">
        <div class="row justify-content-center">
            <div class="col-md-8 card card-body">
                <div id="print-area">
                    <div class="invoice-header">
                        
                        @php
                            $shop = \App\Shop::find(session('shop'));
                        @endphp
                        <div class="logo-area">
                            {{-- @if ($pos_setting->logo != null)
                            <img src="{{ asset($shop->logo) }}" alt="logo">
                            @else --}}
                            <h1 class="title">{{ $shop->name }}</h1>
                            {{-- @endif --}}
                        </div>
                        <address>
                            {{ $shop->address }}
                            <br>
                            Phone : <strong>{{ $shop->phone }}</strong>
                            <br>
                            Email : <strong>{{ $shop->email }}</strong>
                        </address>

                    </div>

                    @php
                        if ($payment->customer) {
                            $user = $payment->customer;
                        } elseif ($payment->supplier) {
                            $user = $payment->supplier;
                        }

                        $first_item=$payment->payments()->first();
                    @endphp

                    <table class="table mt-2">
                        <tbody>
                            <tr>
                                <td colspan="4" style="border-top: 0">
                                    <h3 style="text-align: center; font-weight:bold;">Payment Invoice</h3>
                                </td>
                            </tr>
                            <tr>
                                <td style="width:15%;">Payment No :</td>
                                <th style="width: 35%;">{{ $payment->id }}</th>
                                <td style="width:15%;">Date :</td>
                                <th>{{ date('d M, Y', strtotime($payment->date)) }}</th>
                            </tr>

                            <tr>
                                <td>Name :</td>
                                <td colspan="3">{{ $user->name ?? '' }}</td>
                            </tr>

                            <tr>
                                <td>Address :</td>
                                <th colspan="3">{{ $user->address ?? '' }}</th>
                            </tr>

                            <tr>
                                <td>Mobile :</td>
                                <th colspan="3">{{ $user->phone ?? '' }}</th>
                            </tr>

                            <tr>
                                <td>Account Type :</td>
                                <th colspan="3">
                                    @php

                                    @endphp
                                    @if ($payment->customer_id)
                                        Customer
                                    @elseif($payment->supplier_id)
                                        Supplier
                                    @else
                                        Customer
                                    @endif
                                </th>
                            </tr>

                            <tr>
                                <td>Transaction Type :</td>
                                <th colspan="3" style="text-transform: capitalize">{{ $payment->payment_type }}</th>
                            </tr>
                            <tr>
                                <td>Note :</td>
                                <th colspan="3">{{ $payment->note??'---' }}</th>
                            </tr>
                        </tbody>
                    </table>





                        {{-- <div class="clearfix"></div> --}}
                        {{-- items Design --}}
                        <table class="table table-bordered table-plist my-3">
                            <tr class="bg-primary">
                                <th>Date</th>
                                <th>Previous Due</th>
                                <th>Paid</th>
                                <th>Due</th>
                            </tr>

                            <tbody>
                                <tr>
                                    <td>{{ date('d/m/Y', strtotime($payment->date)) }}</td>
                                    @php
                                        $total_due = 0;
                                        if ($payment->customer_id) {
                                            $total_due = $payment->customer->total_due();
                                        } elseif ($payment->supplier_id) {
                                            $total_due = $payment->supplier->total_due();
                                        }
                                    @endphp
                                    <td>{{ $payment->amount + $total_due }}</td>
                                    <td>{{ $payment->amount }}</td>
                                    <td>{{ number_format($total_due, 2) }}</td>
                                </tr>
                            </tbody>

                        </table>
                </div>
                <button class="btn btn-secondary btn-block" onclick="print_receipt('print-area')">
                    <i class="fa fa-print"></i>
                    Print
                </button>
                <a href="{{ route('payment.create') }}" class="btn btn-primary btn-block">
                    <i class="fa fa-reply"></i>
                    Back
                </a>
            </div>
        </div>
    </div>
@endsection

@section('styles')
    <link href="https://fonts.googleapis.com/css?family=Petrona&display=swap" rel="stylesheet">
    <style rel="stylesheet">
        strong {
            font-weight: 800;
        }

        address {
            margin-bottom: 0px;
        }

        .invoice-header {
            width: 100%;
            display: block;
            box-sizing: border-box;
            overflow: hidden;
        }

        .invoice-header address {
            width: 50%;
            float: left;
            padding: 5px;
        }

        .logo-area img {
            width: 40%;
            display: inline;
            float: left;
        }

        .logo-area h1 {
            display: inline;
            float: left;
            font-size: 17px;
            padding-left: 8px;
        }

        .invoice-header .logo-area {
            width: 50%;
            float: left;
            padding: 5px;
        }



        table td,table th{
            padding:1px !important;
        }


        .card * {
            color: #000000 !important;
        }

        @media print {
            body * {
                visibility: visible;
                color: #000000 !important;
            }

            .table-rheader td {
                border-top: 0px;
                padding: 5px;
                vertical-align: baseline !important;
            }

            .table-plist td {
                padding: 5px;
                text-align: center;
            }

            .table-plist th {
                padding: 5px;
                text-align: center;
            }

            .border-bottom {
                border-bottom: 1px dotted #CCC;
            }
        }

        body {
            font-family: 'Petrona', serif;
        }
    </style>
    {{-- <link rel="stylesheet" href="{{ asset('dashboard/css/receipt.css') }}"> --}}

    <style>
        .table-rheader td {
            border-top: 0px;
            padding: 5px;
            vertical-align: baseline !important;
        }

        .table-plist td {
            padding: 5px;
            text-align: center;
        }

        .table-plist th {
            padding: 5px;
            text-align: center;
            background: #ddd;
        }

        .border-bottom {
            border-bottom: 1px dotted #CCC;
        }
    </style>
@endsection

@section('scripts')
    <script>
        // clear localstore
        localStorage.removeItem('pos-items');

        function print_receipt(divName) {
            let printDoc = $('#' + divName).html();
            let originalContents = $('body').html();
            $("body").html(printDoc);
            window.print();
            $('body').html(originalContents);
        }
    </script>
@endsection
