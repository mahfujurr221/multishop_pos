@extends('layouts.master')
@section('title', 'Create Customer')

@section('page-header')
    <header class="header bg-ui-general">
        <div class="header-info">
          <h1 class="header-title">
            <strong>New Customer</strong>
          </h1>
        </div>

        <div class="header-action">
          <nav class="nav">
            <a class="nav-link" href="{{ route('customer.index') }}">
              Customers
            </a>
            <a class="nav-link active" href="{{ route('customer.create') }}">
                 <i class="fa fa-plus"></i>
                 New Customer
            </a>
          </nav>
        </div>
      </header>
@endsection

@section('content')
  <div class="col-12">
    <div class="card">
      <h4 class="card-title">New Customer</h4>

    <form action="{{ route('customer.store') }}" method="POST">
    @csrf
      <div class="card-body">
        <div class="form-row">
               <div class="form-group col-md-6">
                    <label for="">Customer Name<span class="field_required"></span></label>
                    <input type="text" class="form-control {{ $errors->has('name') ? 'is-invalid': '' }}" name="name" value="{{ old('name') }}" placeholder="Enter Customer Name...">
                    @if($errors->has('name'))
                         <span class="invalid-feedback">{{ $errors->first('name') }}</span>
                    @endif
               </div>
               <div class="form-group col-md-6">
                    <label for="email">Email</label>
                    <input type="email" class="form-control {{ $errors->has('email') ? 'is-invalid': '' }}" name="email" value="{{ old('email') }}" placeholder="Enter Customer Email...">
                    @if($errors->has('email'))
                         <span class="invalid-feedback">{{ $errors->first('email') }}</span>
                    @endif
               </div>
               <div class="form-group col-md-6">
                    <label for="phone">Address</label>
                    <textarea name="address" class="form-control {{ $errors->has('address') ? 'is-invalid': '' }}" placeholder="Write Customer Address"></textarea>
                    @if($errors->has('address'))
                         <span class="invalid-feedback">{{ $errors->first('address') }}</span>
                    @endif
               </div>

               <div class="form-group col-md-6">
                    <label for="phone">Phone<span class="field_required"></span></label>
                    <input type="text" class="form-control {{ $errors->has('phone') ? 'is-invalid': '' }}" name="phone" value="{{ old('phone') }}" placeholder="Enter Customer Phone...">
                    @if($errors->has('phone'))
                         <span class="invalid-feedback">{{ $errors->first('phone') }}</span>
                    @endif
               </div>

              <div class="form-group col-md-6">
                    <label for="">Opening Receivable</label>
                    <input type="text" name="opening_receivable" value="{{ old("opening_receivable") }}" class="form-control">
                    @if($errors->has('opening_receivable'))
                      <div class="alert alert-danger">{{ $errors->first('opening_receivable') }}</div>
                    @endif
               </div>

               <div class="form-group col-md-6">
                    <label for="">Opening Payable</label>
                    <input type="text" name="opening_payable" value="{{ old("opening_payable") }}" class="form-control">
                    @if($errors->has('opening_payable'))
                      <div class="alert alert-danger">{{ $errors->first('opening_payable') }}</div>
                    @endif
               </div>

        </div> <!-- End form-row -->
     <div class="form-row justify-content-center">
          <button class="btn btn-primary">
               <i class="fa fa-save mr-2"></i>
                    Save
          </button>
     </div>
      </div>
      </form>
    </div>
  </div>
@endsection

@section('styles')

@endsection

@section('scripts')

@endsection
