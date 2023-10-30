@extends('layouts.master')
@section('title', 'Create Delivery Agent')

@section('page-header')
<header class="header bg-ui-general">
     <div class="header-info">
          <h1 class="header-title">
               <strong>New Delivery Agent</strong>
          </h1>
     </div>

     <div class="header-action">
          <nav class="nav">
               <a class="nav-link" href="{{ route('delivery-agent.index') }}">
                    Delivery Agents
               </a>
               <a class="nav-link active" href="{{ route('delivery-agent.create') }}">
                    <i class="fa fa-plus"></i>
                    New Delivery Agent
               </a>
          </nav>
     </div>
</header>
@endsection

@section('content')
<div class="col-12">
     <div class="card">
          <h4 class="card-title">New Delivery Agent</h4>

          <form action="{{ route('delivery-agent.store') }}" method="POST">
               @csrf
               <div class="card-body">
                    <div class="form-row">
                         <div class="col-md-6">
                              <div class="form-group">
                                   <label for="">Delivery Agent Name</label>
                                   <input type="text" class="form-control {{ $errors->has('name') ? 'is-invalid': '' }}"
                                        name="name" value="{{ old('name') }}"
                                        placeholder="Enter Delivery Agent Name...">
                                   @if($errors->has('name'))
                                   <span class="invalid-feedback">{{ $errors->first('name') }}</span>
                                   @endif
                              </div>


                         </div>

                         <div class="col-md-6">
                              <div class="form-group">
                                   <label for="phone">Address</label>
                                   <textarea name="address"
                                        class="form-control {{ $errors->has('address') ? 'is-invalid': '' }}"
                                        placeholder="Write Delivery Agent Address"></textarea>
                                   @if($errors->has('address'))
                                   <span class="invalid-feedback">{{ $errors->first('address') }}</span>
                                   @endif
                              </div>
                         </div>
                    </div> <!-- End form-row -->
                    <div class="form-row justify-content-center">
                         <button class="btn btn-primary">
                              <i class="fa fa-save mr-2"></i>
                              Save & New
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