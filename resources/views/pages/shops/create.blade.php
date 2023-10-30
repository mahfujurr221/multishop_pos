@extends('layouts.master')
@section('title', 'Create Shop')

@section('page-header')
<header class="header bg-ui-general">
  <div class="header-info">
    <h1 class="header-title">
      <strong>New Shop</strong>
    </h1>
  </div>

  <div class="header-action">
    <nav class="nav">
      <a class="nav-link" href="{{ route('shops.index') }}">
        shops
      </a>
      <a class="nav-link active" href="{{ route('shops.create') }}">
        <i class="fa fa-plus"></i>
        Add Shop
      </a>
    </nav>
  </div>
</header>
@endsection

@section('content')
<div class="col-12">
  <div class="card">
    <div class="row">
      <div class="col-12" style="">
        <h4 class="card-title" style="display: inline-block;">New Shop</h4>

        {{-- <a href="{{ route('product.add_category') }}" class="edit btn btn-info-outline float-right mt-2 ml-4"
          data-target="#edit" id="Add Category">Add Category</a> --}}

      </div>
    </div>


    <form action="{{ route('shops.store') }}" method="POST" enctype="multipart/form-data">
      @csrf
      <div class="card-body">
        <div class="form-row">
            <div class="col-12">
                <div class="flexbox gap-items-4">
                    <img class="avater img-thumbnail" id="target" width="200" src="{{ asset($pos_setting->logo) }}" alt="Large Logo">

                    <div class="flex-grow">
                        <h5>{{ $pos_setting->name }}</h5>
                        <div class="d-flex flex-column flex-sm-row gap-y gap-items-2 mt-16">
                            <div class="file-group file-group-inline">
                                <button class="btn btn-sm btn-w-lg btn-bold btn-secondary file-browser" type="button">Change
                                    Logo</button>
                                <input type="file" name="logo" id="src" onchange="loadFile(event)">
                                {{-- <img id="target" style="max-height:100px;"/> --}}
                                @if ($errors->has('logo'))
                                    <div class="invalid-feedback">{{ $errors->first('logo') }}</div>
                                @endif
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="form-group col-md-6 mt-2">
                <label for="">Name</label>
                <input type="text" name="name" value="{{ old("name") }}" class="form-control">
                @error('name')
                  <div class="text-danger mt-2">{{ $message }}</div>
                @enderror
            </div>

            <div class="form-group col-md-6">
              <label for="">Email</label>
              <input type="text" name="email" value="{{ old("email") }}" class="form-control">
              @if($errors->has('email'))
                <div class="alert alert-danger">{{ $errors->first('email') }}</div>
              @endif
            </div>

            <div class="form-group col-md-6">
              <label for="">Phone</label>
              <input type="text" name="phone" value="{{ old("phone") }}" class="form-control">
              @if($errors->has('phone'))
                <div class="alert alert-danger">{{ $errors->first('phone') }}</div>
              @endif
            </div>

            <div class="form-group col-md-6">
              <label for="">Address</label>
              <textarea name="address" class="form-control">{{ old("address") }}</textarea>
              @if($errors->has('address'))
                <div class="alert alert-danger">{{ $errors->first('address') }}</div>
              @endif
            </div>
        </div>

        <hr>
        <div class="form-row justify-content-center">
          <div class="form-group ">
            <button type="submit" class="btn btn-info">
              <i class="fa fa-save"></i>
              Add Shop
            </button>
          </div>
        </div>
      </div>
    </form>
  </div>
</div>
@endsection

@section('styles')
{{--
<link rel="stylesheet" href="{{ asset('back/plugins/select2-bootstrap4-theme/select2-bootstrap4.min.css') }}"> --}}
<style>
  .form-control {
    border-color: #b5b1b1;
  }

  label {
    font-size: 13px;
    font-weight: 600;
  }
</style>
@endsection

@section('scripts')

<script src="{{ asset('js/modal_form_no_reload.js') }}"></script>

@include('includes.placeholder_model')

<script>
    var loadFile = function(event) {
    var reader = new FileReader();
    reader.onload = function(){
      var output = document.getElementById('target');
      output.src = reader.result;
    };
    reader.readAsDataURL(event.target.files[0]);
  };


</script>
@endsection
