@extends('layouts.master')
@section('title', 'Customer Report')

@section('page-header')
<header class="header bg-ui-general">
     <div class="header-info">
          <h1 class="header-title">
               <strong>
                    {{ $customer->name }}
                    <span class="small">Customer</span>
               </strong>

          </h1>
     </div>

</header>
@endsection

@section('content')
<div class="col-md-3 col-lg-3">
     <div class="card card-body bg-primary">
          <h6>
               <span class="text-uppercase text-white">Total Buy</span>
          </h6>
          <br>
          <p class="fs-18 fw-600">৳ {{ number_format($customer->sales->sum('payable')) }}</p>
     </div>
</div>
<div class="col-md-3 col-lg-3">
     <div class="card card-body bg-success">
          <h6>
               <span class="text-uppercase text-white">Total Pay</span>
          </h6>
          <br>
          <p class="fs-18 fw-600">৳ {{ number_format($customer->pay()) }}</p>
     </div>
</div>
<div class="col-md-3 col-lg-3">
     <div class="card card-body bg-danger">
          <h6>
               <span class="text-uppercase text-white">Total Due</span>
          </h6>
          <br>
          <p class="fs-18 fw-600">৳
               {{ number_format($customer->sales->sum('payable') - $customer->pay()) }}</p>
     </div>
</div>
<div class="col-md-3 col-lg-3">
     <div class="card card-body bg-info">
          <h6>
               <span class="text-uppercase text-white">Information</span>
          </h6>
          <p class="mb-0">Address: {{ $customer->address }}</p>
          <p>Phone: {{ $customer->phone }}</p>

     </div>
</div>


<div class="col-md-12">
     <div class="card">
          <h4 class="card-title"><strong>{{ $customer->name }} - History</strong></h4>

          <div class="card-body">
               <div class="">
                    <h4 class="p-2">Sale Report</h4>
                    @if($customer->sales->count() > 0)
                    <table class="table table-responsive-sm table-soft table-bordered" data-provide="datatables">
                         <thead>
                              <tr class="bg-primary">
                                   <th>#</th>
                                   <th>sales Date</th>
                                   <th>Total Item</th>
                                   <th>Total Bill </th>
                                   <th>Pay </th>
                                   <th>Due</th>
                              </tr>
                         </thead>
                         <tbody>
                              @foreach ($customer->sales as $key => $item)
                              <tr>
                                   <td>{{ ++$key}}</td>
                                   <td>{{ date('d M, Y', strtotime($item->sale_date)) }}</td>
                                   <td>{{ $item->items->count() }}</td>
                                   <td>{{ $item->payable }} Tk</td>
                                   <td>{{ $item->payments ? $item->payments->sum('pay_amount') : 'No Payment' }} Tk</td>
                                   <td>{{ $item->payments ? $item->payable - $item->payments->sum('pay_amount') : 'No Payment' }}
                                        Tk</td>
                              </tr>
                              @endforeach
                         </tbody>
                    </table>
                    @else
                    <div class="alert alert-warning text-center">
                         <strong>{{ $customer->name }} - No Sales History. Sorry !</strong>
                    </div>
                    @endif
               </div>
               <div class="">
                    <h5 class="p-2 mt-4">Sales Payment Report</h5>
                    @if($customer->sales)
                    <table class="table table-responsive-sm table-soft table-bordered" data-provide="datatables">
                         <thead>
                              <tr class="bg-primary">
                                   <th>#</th>
                                   <th>Transaction Number</th>
                                   <th>Payment Date</th>
                                   <th>Pay Amount</th>
                                   <th>Payment Method </th>
                              </tr>
                         </thead>
                         <tbody>
                              @foreach ($customer->sales as $key => $item)
                              @foreach ($item->payments as $x => $payment)
                              <tr>
                                   <td>{{ ++$x}}</td>
                                   <td>{{ $payment->transaction_id }}</td>
                                   <td>{{ date('d M, Y', strtotime($payment->payment_date)) }}</td>
                                   <td>{{ $payment->pay_amount }} Tk</td>
                                   <td>{{ $payment->method ? ucfirst(str_replace('-', ' ', $payment->method)) : 'Unknown Method' }}
                                   </td>
                              </tr>
                              @endforeach
                              @endforeach
                         </tbody>
                    </table>
                    @else
                    <div class="alert alert-warning text-center">
                         <strong>{{ $customer->name }} - No Paymnets History. Sorry !</strong>
                    </div>
                    @endif
               </div>
          </div>
     </div>
</div>

@endsection

@section('styles')

@endsection

@section('scripts')

@endsection
