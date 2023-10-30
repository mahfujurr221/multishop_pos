@extends('layouts.master')
@section('title', 'Dashboard')
@section('content')
    @can('dashboard')
        @php
            $summary = new \App\Services\SummaryService();
            $today_sell = $summary::sell_profit(date('Y-m-d'), date('Y-m-d'));
        @endphp
        <div class="card col-12 containing-card ">
            <div class="card-header ">
                <h3 class="card-title ">Today Summary</h3>
            </div>
            <div class="card-body">
                <div class="grid-of-4">
                    <div class="card card-body bg-dark">
                        <h6 class="text-white text-uppercase">Today Sold</h6>
                        <p class="fs-18 fw-700">৳ {{ number_format($today_sell['sell_value']) }}</p>
                    </div>

                    <div class="card card-body card-pink">
                        <h6 class="text-white text-uppercase">
                            Today Sold - Purchase Cost
                        </h6>
                        <p class="fs-18 fw-700 text-white">৳ {{ number_format($today_sell['purchase_cost']) }}</p>
                    </div>

                    <div class="card card-body card-danger">
                        <h6 class="text-white text-uppercase">
                            <span>Today Expense</span>
                        </h6>
                        <p class="fs-18 fw-700 text-white">৳ {{ number_format($expense->todayExpense()->sum('amount')) }}</p>
                    </div>

                    <div class="card card-body card-info">
                        <h6 class="text-white text-uppercase">
                            Today Sell Profit
                        </h6>
                        <p class="fs-18 fw-700 text-white">
                            {{ number_format($today_sell['profit']) }}
                    </div>
                </div>
            </div>
        </div>

        {{-- End Daily report --}}

        {{-- Monthly Summary Report --}}
        @php
            $start_date = date('Y-m-1');
            $end_date = date('Y-m-t');
            // $this_month=$summary::sell_profit(,date('Y-m-t'));
        @endphp

        <div class="card col-12 containing-card ">
            <div class="card-header ">
                <h3 class="card-title ">Current Month Summary</h3>
            </div>
            <div class="card-body">
                <div class="grid-of-5">
                    <div class="card card-body bg-primary">
                        <h6 class="text-white text-uppercase">Sold in {{ date('M Y') }}</h6>
                        <p class="fs-18 fw-700">৳ {{ number_format($monthly_sold = $summary::sold($start_date, $end_date)) }}</p>
                    </div>

                    <div class="card card-body card-brown">
                        <h6 class="text-white text-uppercase">
                            Purchased - in {{ date('M Y') }}
                        </h6>
                        <p class="fs-18 fw-700 text-white">৳
                            {{ number_format($monthly_purchased = $summary::purchased($start_date, $end_date)) }}</p>
                    </div>

                    <div class="card card-body card-danger">
                        <h6 class="text-white text-uppercase">
                            <span>Expense in {{ date('M Y') }}</span>
                        </h6>
                        <p class="fs-18 fw-700 text-white">৳
                            {{ number_format($monthly_spent = $expense->date_to_date(date('Y-m-01'), date('Y-m-t'))) }}</p>
                    </div>
                    @php
                        $monthly_returned = $summary::returned(date('Y-m-01'), date('Y-m-t'));
                    @endphp
                    <div class="card card-body card-cyan">
                        <h6 class="text-white text-uppercase">
                            <span>Returned in {{ date('M Y') }}</span>
                        </h6>
                        <p class="fs-18 fw-700 text-white">৳ {{ number_format($monthly_returned) }}</p>
                    </div>

                    <div class="card card-body card-purple">
                        <h6 class="text-white text-uppercase">
                            Net Profit {{ date('M Y') }}
                            {{-- <span style="font-size: .6em;">(Sold - Purchased - Spent - Returned)</span> --}}
                        </h6>
                        <p class="fs-18 fw-700 text-white">
                            {{ number_format($monthly_sold - $monthly_purchased - $monthly_spent - $monthly_returned) }}
                    </div>

                </div>
            </div>
        </div>
        {{-- End Monthly Summary Report --}}


        {{-- Lifetime Report --}}
        @php
            // $lifetime=$summary::sell_profit();
        @endphp
        
        <div class="card col-12 containing-card ">
            <div class="card-header ">
                <h3 class="card-title ">Total</h3>
            </div>
            <div class="card-body">
                <div class="grid-of-5">
                    <div class="card card-body bg-dark">
                        <h6 class="text-white text-uppercase">Total Sold</h6>
                        <p class="fs-18 fw-700">৳ {{ number_format($total_sold = $summary::sold()) }}</p>
                    </div>

                    <div class="card card-body card-success">
                        <h6 class="text-white text-uppercase">
                            Total Purchase Cost
                        </h6>
                        <p class="fs-18 fw-700 text-white">৳
                            {{ number_format($total_purchased = $summary::purchased()) }}</p>
                    </div>

                    <div class="card card-body card-danger">
                        <h6 class="text-white text-uppercase">
                            <span>Total Expense</span>
                        </h6>
                        <p class="fs-18 fw-700 text-white">৳ {{ number_format($total_spent = $expense->totalExpense()) }}</p>
                    </div>
                    @php
                        $total_returned = $summary::returned();
                    @endphp
                    <div class="card card-body card-cyan">
                        <h6 class="text-white text-uppercase">
                            <span>Total Returned</span>
                        </h6>
                        <p class="fs-18 fw-700 text-white">৳ {{ number_format($total_returned) }}</p>
                    </div>

                    <div class="card card-body card-brown">
                        <h6 class="text-white text-uppercase">
                            Total Profit
                        </h6>
                        <p class="fs-18 fw-700 text-white">

                            {{ number_format($total_sold - $total_purchased - $total_spent - $total_returned) }}
                    </div>
                </div>
            </div>
        </div>
        {{-- End Lifetime Summary --}}

        {{-- Due Receivable Summary --}}

        <div class="col-6">
            <div class="card card-body bg-purple">
                <h6>
                    <span class="text-uppercase text-white">Total Receivable</span>
                </h6>
                <p class="fs-28 fw-700">৳ {{ number_format($summary::total_receivable()) }}</p>
            </div>
        </div>


        <div class="col-6">
            <div class="card card-body bg-yellow">
                <h6>
                    <span class="text-uppercase text-white">Total Payable</span>
                </h6>
                <p class="fs-28 fw-700">৳ {{ number_format($summary::total_payable()) }}</p>
            </div>
        </div>


        {{-- SELL PURCHASE VALUE --}}
        @php
            $sell_purchase_value = $summary::stock_value();
        @endphp

        <div class="col-6">
            <div class="card card-body bg-brown">
                <h6>
                    <span class="text-uppercase text-white">Stock - Purchase Value</span>
                </h6>
                <p class="fs-28 fw-700">৳ {{ number_format($sell_purchase_value['total_purchase_value']) }}</p>
            </div>
        </div>


        <div class="col-6">
            <div class="card card-body bg-info">
                <h6>
                    <span class="text-uppercase text-white">Stock - Sell Value</span>
                </h6>
                <p class="fs-28 fw-700">৳ {{ number_format($sell_purchase_value['total_sell_value']) }}</p>
            </div>
        </div>
        {{-- END SELL PURCHASE VALUE --}}

        {{-- ETC --}}
        <div class="col-md-3 col-6">
            <div class="card card-body bg-dark">
                <h6 class="text-white text-uppercase">Total Customer</h6>
                <p class="fs-18 fw-700"> {{ \App\Customer::count() }}</p>
            </div>
        </div>

        <div class="col-md-3 col-6">
            <div class="card card-body card-brown">
                <h6 class="text-white text-uppercase">
                    Total Supplier
                </h6>
                <p class="fs-18 fw-700 text-white">
                    {{ \App\Supplier::count() }}</p>
            </div>
        </div>

        <div class="col-md-3 col-6">
            <div class="card card-body card-danger">
                <h6 class="text-white text-uppercase">
                    <span>Total Invoice</span>
                </h6>
                <p class="fs-18 fw-700 text-white"> {{ \App\Pos::count() }}</p>
            </div>
        </div>

        <div class="col-md-3 col-6">
            <div class="card card-body card-purple">
                <h6 class="text-white text-uppercase">
                    Total Product
                </h6>
                <p class="fs-18 fw-700 text-white">
                    {{ \App\Product::count() }}
            </div>
        </div>
    @endcan

@endsection

@section('styles')
    <style>
        .main-content {
            padding-top: 25px;
        }

        
        @media (min-width: 250px) {
            .grid-of-5 {
                width: 100%;
                display: grid;
                grid-template-columns: repeat(2, minmax(100px, auto));
                grid-column-gap: 1.5%;
            }

            .grid-of-4 {
                width: 100%;
                display: grid;
                grid-template-columns: repeat(2, minmax(100px, auto));
                grid-column-gap: 1.5%;
            }
        }

        @media (min-width: 768px) {
            .grid-of-5 {
                width: 100%;
                display: grid;
                grid-template-columns: repeat(4, minmax(100px, 1fr));
                grid-column-gap: 1.5%;
            }

            .grid-of-4 {
                width: 100%;
                display: grid;
                grid-template-columns: repeat(4, minmax(100px, 1fr));
                grid-column-gap: 1.5%;
            }
        }

        @media (min-width: 992px) {
            .grid-of-5 {
                width: 100%;
                display: grid;
                grid-template-columns: repeat(5, minmax(100px, 1fr));
                grid-column-gap: 1.5%;
            }
        }

        .grid-of-2 {
            width: 100%;
            display: grid;
            grid-template-columns: repeat(2, minmax(100px, 1fr));
            grid-column-gap: 1.5%;
        }

        .card .card {
            margin-bottom: 10px;
        }

        .containing-card>.card-body {
            padding: 10px;
        }

        .card-header {
            padding: 5px;
        }
    </style>
@endsection


@section('scripts')
    <script>
        localStorage.removeItem('pos-items');
    </script>
@endsection
