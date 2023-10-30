@extends('layouts.master')
@section('title', 'POS Manage')

@section('page-header')
<header class="header bg-ui-general">
  <div class="header-info">
    <h1 class="header-title">
      <strong>POS Manage</strong>
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

        <form action="{{ route('pos.store') }}" id="order-form" method="POST">
          @csrf
          <div class="form-row">
            <input type="text" data-provide="datepicker" data-date-today-highlight="true" data-date-format="yyyy-mm-dd"
              class="form-control" name="sale_date" value="{{ date('Y-m-d') }}">
          </div>
          <div class="form-row mt-4">
            <div class="form-group col-9">
              <select name="customer" id="customer" class="form-control" data-provide="selectpicker"
                data-live-search="true" data-size="10">
                <option value="0">Walk-in Customer</option>
                @foreach ($customers as $customer)
                <option value="{{ $customer->id }}">{{ $customer->name." - ".$customer->phone }}</option>
                @endforeach
              </select>
            </div>

            <div class="col-3">
              {{-- <button class="" type="button" data-toggle="modal" data-target="#add-customer-modal">Add</button> --}}
              <a href="{{ route("pos.add_customer") }}" class="edit btn btn-primary" data-toggle="modal" data-target="#edit" id="Add Customer">
                  {{-- <i class="fa fa-money text-primary"></i> --}}
                  Add
              </a>
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
                    <th>Price</th>
                    <th>Sub T</th>
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
                    <th class="text-center" colspan="4">Total Qty: <strong id="totalQty"></strong> </th>
                    <th class="text-center" colspan="3">Total: <strong id="totalAmount"></strong> Tk</th>
                  </tr>
                </tfoot>
              </table>

              <div class="form-gorup text-center">
                <button type="button" id="payment-btn" class="btn btn-primary">
                  <i class="fa fa-money"></i>
                  Payment
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
              {{-- Payment Modal --}}
              <div class="modal fade" id="payment-modal" tabindex="-1">
                <div class="modal-dialog modal-md">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h4 class="modal-title" id="myModalLabel">Payment</h4>
                      <button type="button" class="close" data-dismiss="modal">
                        <span aria-hidden="true">×</span>
                      </button>
                    </div>
                    <div class="modal-body">
                      <table class="table table-bordered text-left">
                        <tr>
                          <td width="50%">
                            <strong class="float-left">Paying Items: </strong>
                            <strong class="float-right">(<span id="items">0</span>)</strong>
                          </td>
                          <td>
                            <strong class="float-left">Total Receivable: </strong>
                            <strong class="float-right">(<span id="receivable">0</span> Tk)</strong>
                            <input type="hidden" name="receivable_amount" id="receivable_input">
                            <input type="hidden" name="cost_amount" id="cost_input">

                          </td>
                        </tr>
                        <tr>
                          <td width="50%">
                            <strong class="float-left">After Discount : </strong>
                            <strong class="float-right"> (<span id="after_discount">0</span> Tk)</strong>
                          </td>
                          <td>
                            <strong class="float-left">Balance </strong>
                            <strong class="float-right"> (<span id="balance">0</span> Tk)</strong>
                            <input type="hidden" name="balance" id="balance_input">
                          </td>
                        </tr>

                        <tr>
                          <td width="50%">
                            <strong class="float-left">After Delivery Cost : </strong>
                            <strong class="float-right"> (<span id="after_delivery_cost">0</span> Tk)</strong>
                          </td>
                          <td>

                          </td>
                        </tr>

                      </table>
                      <hr>
                      <div class="form-row">
                        <div class="form-group col-md-6">
                          <label for="discount">Discount</label>
                          <input type="text" class="form-control" id="discount" name="discount" placeholder="0%">
                        </div>
                        <div class="form-group col-md-6">
                            <label for="order_type">Order Type </label>
                            <select name="order_type" id="order_type" class="form-control">
                                <option value="general">General </option>
                                <option value="online">Online </option>
                            </select>
                        </div>
                      </div>
                      
                      <div class="row order_type_online">
                          <div class="col-md-6">
                              <div class="form-group">
                                  <label for="delivery_area">Delivery Area</label>
                                  <select name="delivery_area" id="delivery_area"
                                      class="form-control">
                                      <option value="">Select Delivery Area </option>
                                      @foreach ($area_list as $area)
                                      <option value="{{ $area->id }}"
                                          data="{{ $area->delivery_charge }}">
                                          {{ $area->name }}</option>
                                      @endforeach
                                  </select>
                              </div>
                          </div>

                          <div class="col-md-6">
                              <div class="form-group">
                                  <label for="delivery_charge">Delivery Charge</label>
                                  <input type="text" class="form-control"
                                      placeholder="Delivery charge" id="delivery_charge"
                                      name="delivery_charge">
                              </div>
                          </div>
                      </div>
                      <div class="form-row order_type_online">
                          <div class="form-group col-md-6">
                            <label for="payment_method"> Delivery Agent </label>
                            <select name="delivery_agent" id="" class="form-control">
                                <option value="">Select </option>
                                @foreach ($delivery_methods as $method)
                                <option value="{{ $method->id }}">
                                    {{ $method->name }}</option>
                                @endforeach
                            </select>
                        </div>
                        
                        <div class="col-md-6">
                              <div class="form-group">
                                  <label for="order_status">Order Status </label>
                                  <select name="order_status" id="order_status"
                                      class="form-control">
                                      @foreach ($order_status_list as $status)
                                      <option value="{{ $status->id }}">
                                          {{ $status->name }}</option>
                                      @endforeach
                                  </select>
                              </div>
                          </div>
                      </div>

                      <div class="form-row">
                        <div class="form-group col-md-12">
                          <label for="payment_method">Note</label>
                          <textarea name="note" class="form-control"></textarea>
                        </div>
                      </div>
                      <hr>
                      <div class="form-row">

                        <div class="form-group col-md-6">
                            <label for="">Transection Account</label>
                            <select name="bank_account_id" class="form-control" required>
                              @foreach (\App\BankAccount::all() as $item)
                              <option value="{{ $item->id }}" {{ old("bank_account_id") == $item->id ? "SELECTED":"" }}>
                                {{ $item->name }}</option>
                              @endforeach
                            </select>
                            @if($errors->has('bank_account_id'))
                            <div class="alert alert-danger">{{ $errors->first('bank_account_id') }}</div>
                            @endif
                        </div>

                        <div class="form-group col-md-6">
                          <label for="pay_amount">Pay Amount</label>
                          <div class="input-group">
                            <input type="number" step="any" class="form-control" name="pay_amount" id="pay_amount"
                              placeholder="Pay Amount...">
                            <span class="input-group-btn">
                              <button class="btn btn-warning" type="button" id="paid_btn">PAID!</button>
                            </span>
                          </div>
                        </div>
                      </div>
                      <hr>
                    </div>
                    <div class="modal-footer">
                      <button type="button" class="btn btn-bold btn-secondary" data-dismiss="modal">Cancel</button>
                      <button type="submit" class="btn btn-bold btn-primary" id="order-btn">
                        <i class="fa fa-shopping-cart"></i>
                        Order
                      </button>
                    </div>
                  </div>
                </div>
              </div>
        </form>


      </div>
    </div>
  </div>
</div>
<div class="col-md-6">
  <div id="products">
    @include('pages.pos.products')
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

@include('pages.pos.scripts')

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

    $("#delivery_area").on("change", function() {
        let cost = parseFloat($(this).find(':selected').attr('data'));
        let afterDiscount = parseFloat($("#after_discount").text());

        if (isNaN(cost)) {
            cost = 0;
        }

        $("#delivery_charge").val(cost);
        $("#after_delivery_cost").text(afterDiscount + cost);
        let total = afterDiscount + cost;
        $("#receivable_input").val(total);
        
    });
        

      /**
       * Order Type Manage
       * */
      $("#order_type").on("change", function() {
          if ($(this).val() == 'online') {
              $(".order_type_online").show();
          } else {
              $(".order_type_online").hide();
          }
      });

      $(".order_type_online").hide();
</script>

{{-- <script src="/js/add_customer.js"></script> --}}

  <script src="{{ asset('js/modal_form.js') }}"></script>
@endsection
