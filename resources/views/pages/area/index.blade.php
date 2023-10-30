@extends('layouts.master')
@section('title', 'Area Managment')

@section('page-header')
<header class="header bg-ui-general">
  <div class="header-info">
    <h1 class="header-title">
      <strong>Area Manage</strong>
    </h1>
  </div>

  <div class="header-action">
    <nav class="nav">
      <a class="nav-link active" href="{{ route('area.index') }}">
        Area Manage
      </a>

    </nav>
  </div>
</header>
@endsection

@section('content')
<div class="col-12">
  <div class="card">
    <h4 class="card-title">
      New Area
    </h4>
    <div class="card-body">
      <form action="@isset($area) {{ route('area.update', $area->id) }} @else {{ route('area.store') }} @endisset"
        method="post">
        @csrf
        @isset($area)
        @method('PUT')
        @endisset
        <div class="row">
          <div class="col-md-6">
            <div class="form-group">
              <label for="area_name">Area Name</label>
              <input type="text" name="name" @isset($area) value="{{ $area->name }}" @endisset
                placeholder="Enter area name" class="form-control {{ $errors->has('name') ? 'is-invalid': '' }} ">
              @if($errors->has('name'))
              <span class="invalid-feedback">{{ $errors->first('name') }}</span>
              @endif
            </div>
          </div>
          <div class="col-md-6">
            <div class="form-group">
              <label for="delivery_charge">Delivery Charge </label>
              <input type="text" name="delivery_charge" @isset($area) value="{{ $area->delivery_charge }}" @endisset
                placeholder="Enter delivery charge"
                class="form-control {{ $errors->has('delivery_charge') ? 'is-invalid': '' }} ">
              @if($errors->has('delivery_charge'))
              <span class="invalid-feedback">{{ $errors->first('delivery_charge') }}</span>
              @endif
            </div>
          </div>
        </div>

        <button class="btn btn-primary" type="submit">
          @isset($area)
          <i class="fa fa-refresh"></i>
          Update Area
          @else
          <i class="fa fa-save"></i>
          Save Area
          @endisset
        </button>
      </form>
    </div>
  </div>
  <div class="card">
    <h4 class="card-title"><strong>Area List</strong></h4>
    <div class="card-body card-body-soft">
      @if($area_list->count() > 0)
      <div class="table-responsive table-bordered">
        <table class="table table-soft">
          <thead>
            <tr class="bg-primary">
              <th>#</th>
              <th>Area Name</th>
              <th>Delivery Charge </th>
              <th>#</th>
            </tr>
          </thead>
          <tbody>
            @foreach($area_list as $key => $area)
            <tr>
              <th scope="row">{{ ++$key }}</th>
              <td>{{ $area->name }}</td>

              <td>{{ number_format($area->delivery_charge, 2) }}.Tk</td>
              <td>
                <div class="btn-group">
                  <button class="btn btn-primary dropdown-toggle" data-toggle="dropdown" aria-expanded="false">
                    <i class="fa fa-cogs"></i>
                    Manage
                  </button>
                  <div class="dropdown-menu" x-placement="bottom-start">
                    <a class="dropdown-item" href="{{ route('area.edit', $area->id) }}">
                      <i class="fa fa-edit"></i>
                      Edit
                    </a>
                    <a class="dropdown-item" href="#" onclick="handle({{ $area->id }})">
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
        {{ $area_list->links() }}
      </div>
      @else
      <div class="alert alert-danger text-center" role="alert">
        <strong>You have no area</strong>
      </div>
      @endif
    </div>
  </div>
</div>
{{-- Delete Confirm Modal --}}
<div class="modal fade show" id="confirm-modal" tabindex="-1" aria-modal="true">
  <div class="modal-dialog modal-sm">
    <div class="modal-content">
      <div class="modal-header">
        <h4 class="modal-title" id="myModalLabel">You want to delete ?</h4>
        <button type="button" class="close" data-dismiss="modal">
          <span aria-hidden="true">×</span>
        </button>
      </div>
      <form id="delete-form" action="" method="POST">
        @csrf
        @method('DELETE')
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">No. Back !</button>
          <button type="submit" class="btn btn-primary">Yes, Delete</button>
        </div>
      </form>
    </div>
  </div>
</div>
@endsection

@section('styles')

@endsection

@section('scripts')
<script>
  function handle(id) {
       var url = "{{ route('area.destroy', 'id') }}".replace('id', id);
        $("#delete-form").attr('action', url);
       $("#confirm-modal").modal('show');
     }
</script>
@endsection