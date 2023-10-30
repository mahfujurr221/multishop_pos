@extends('layouts.master')
@section('title', 'Product Transfer Manage')

@section('page-header')
<header class="header bg-ui-general">
  <div class="header-info">
    <h1 class="header-title">
      <strong>Product Transfer Manage</strong>
    </h1>
  </div>
</header>
@endsection

@section('content')
<div class="col-md-12">
  <div class="row">
    <div class="col-md-6">
      <div class="card card-body">
        <form id="scan_code" action="{{ route('get_product') }}" method="POST">
          @csrf
          <div class="form-row mb-3">
            <div class="input-group col-md-12">
              <span class="input-group-addon" id="basic-addon1">
                <i class="fa fa-barcode"></i>
              </span>
              <input type="text" id="id_code" class="form-control" placeholder="Scan Barcode" name="code"  autofocus/>
            </div>
          </div>
        </form>

        <div class="form-row mb-3">
          <div class="col-md-12">
            <input type="text" id="product_search" class="form-control" placeholder="Start to write product name..."
              name="p_name" />
            <input type="hidden" id="search_product_id">

          </div>
        </div>

        <form action="{{ route('product-transfer.store') }}" id="order-form" method="POST">
          @csrf
          <div class="form-row">
            <input type="text" data-provide="datepicker" data-date-today-highlight="true" data-date-format="yyyy-mm-dd"
              class="form-control" name="transfer_date" value="{{ date('Y-m-d') }}">
          </div>

          
          <div class="form-row">
            <div class="form-group col-12">
              <label for="">Shop</label>
              <select name="shop_id" id="" class="form-control">
                @foreach ($shops as $item)
                  <option value="{{ $item->id }}" {{ old("shop_id")==$item->id?"SELECTED":"" }}>{{ $item->name }}</option>
                @endforeach
              </select>
              @error('shop_id')
                <div class="text-danger">{{ $message }}</div>
              @enderror
            </div>
          </div>

          <div class="row">
            <div class="col-md-12 mt-4">
              <table class="table table-bordered">
                <thead class="bg-primary">
                  <tr>
                    <th>Name</th>
                    <th>Size</th>
                    <th style="width:220px;">Quantity</th>
                    <th>
                      <a href="#" id="clearList">
                        <i class="fa fa-trash"></i>
                      </a>
                    </th>
                  </tr>
                </thead>
                <tbody id="tbody"></tbody>
                <tfoot class="bg-danger">
                  <tr>
                    <th class="text-center" colspan="4"> <strong id=""></strong> </th>
                  </tr>
                </tfoot>
              </table>
              <div class="form-gorup text-center">
                <button type="submit" id="payment-btn" class="btn btn-primary">
                  <i class="fa fa-money"></i>
                  Transfer
                </button>
                @if ($errors->any())
                    <div class="text-danger">
                        <ul>
                            @foreach ($errors->all() as $error)
                                <li>{{ $error }}</li>
                            @endforeach
                        </ul>
                    </div>
                @endif
              </div>
              <input type="hidden" name="receivable_amount" id="receivable_input">
              <strong class="float-right d-none">(<span id="receivable">0</span> Tk)</strong>

        </form>


      </div>
    </div>
  </div>
</div>
<div class="col-md-6">
  <div id="products">
    @include('pages.transfer-product.products')
  </div>
</div>
</div>
</div>
{{-- Alert Modal --}}
<div class="modal fade" id="alert-modal" tabindex="-1">
  <div class="modal-dialog modal-sm">
    <div class="modal-content">
      <div class="modal-body">
        <div class="text-center">
          <h3>Please add some products.</h3>
        </div>
      </div>
    </div>
  </div>
</div>

@endsection

@section('styles')
<style>
  hr {
    margin: 5px auto;
  }

  .category{
      max-height: 600px;
      overflow: auto;
  }
.list-group {
    width: fit-content;
  }

  .category .list-group-item .btn {
    text-align: left;
  }
</style>
<link rel="stylesheet" href="{{ asset('dashboard/css/pos.css') }}">
<link rel="stylesheet" href="//code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">
@endsection

@section('scripts')
@include('includes.placeholder_model')

<script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>

@include('pages.transfer-product.scripts')

<script>

//$("#id_code").focus();

  // product search
$(function(){

     $("#product_search").autocomplete({
          source: function (req, res) {
            let url = "{{ route('product-search') }}";
            $.get(url, {req: req.term}, (data) => {
              res($.map(data, function (item) {
                return {
                  id: item.id,
                  value: item.name+" "+item.code,
                  price: item.price
                }
              })); // end res

            });
          },
          select: function (event, ui) {

            $(this).val(ui.item.value);
            $("#search_product_id").val(ui.item.id);
            let url = "{{ route('product.details', 'placeholder_id') }}".replace('placeholder_id', ui.item.id);
            $.get(url, (product) => {
                console.log(product);
                // check stock
                if(product.checkSaleOverStock == 0) {
                  if(product.stock <= 0) {
                    toastr.warning('This product is Stock out. Please Purchases the Product.');
                    return false;
                  }
                }

                // if (pExist(product.id) == true) {
                //     toastr.warning('Please Increase the quantity.');
                // } else {
                //     addProductToCard(product);
                // }
                addProductToCard(product);

            });

            $(this).val('');

            return false;
          },
          response: function (event, ui) {
            if(ui.content.length == 1) {
              ui.item = ui.content[0];
              $(this).data('ui-autocomplete')._trigger('select', 'autocompleteselect', ui);
              $(this).autocomplete('close');

            }
          },
          minLength: 0
     });


    //  CODE SEARCH

     $("#id_code").autocomplete({
          source: function (req, res) {
            let url = "{{ route('product-code-search') }}";
            $.get(url, {req: req.term}, (data) => {
              res($.map(data, function (item) {
                return {
                  id: item.id,
                  value: item.name+" - "+item.code,
                  price: item.price
                }
              })); // end res

            });
          },
          select: function (event, ui) {

            $(this).val(ui.item.value);
            $("#search_product_id").val(ui.item.id);
            let url = "{{ route('product.details', 'placeholder_id') }}".replace('placeholder_id', ui.item.id);
            $.get(url, (product) => {
                // check stock
                if(product.checkSaleOverStock == 0) {
                  if(product.stock <= 0) {
                    toastr.warning('This product is Stock out. Please Purchases the Product.');
                    return false;
                  }
                }

                // if (pExist(product.id) == true) {
                //     toastr.warning('Please Increase the quantity.');
                // } else {
                //     addProductToCard(product);
                // }
                
                      addProductToCard(product);
            });
          $(this).val('');

          return false;
          },
          response: function (event, ui) {
            if(ui.content.length == 1) {
              ui.item = ui.content[0];
              $(this).data('ui-autocomplete')._trigger('select', 'autocompleteselect', ui);
              $(this).autocomplete('close');

            }
          },
          minLength: 0
     });

});


    //  Set Product Id
    function productSelected(id) {
      console.log(id);

    }
</script>

{{-- <script src="/js/add_customer.js"></script> --}}

  <script src="{{ asset('js/modal_form.js') }}"></script>
@endsection
