@extends('layouts.master')
@section('title', 'Product List')

@section('page-header')
<header class="header bg-ui-general">
  <div class="header-info">
    <h1 class="header-title">
      <strong>Sell History</strong>
    </h1>
  </div>

  {{-- <div class="header-action">
    <nav class="nav">
      <a class="nav-link active" href="{{ route('product.index') }}">
        Products
      </a>
      <a class="nav-link" href="{{ route('product.create') }}">
        <i class="fa fa-plus"></i>
        Add Product
      </a>
    </nav>
  </div> --}}


</header>
@endsection

@section('content')
<div class="col-12">


  {{-- <div class="card card-body mb-2"> --}}
    {{-- <form action="{{ route('product.sell_history') }}">
         <div class="form-row">
              <div class="form-group col-md-4">
                   <input type="text" name="code" class="form-control" placeholder="Product Code">
              </div>
         </div>
         <div class="form-row mt-2">
              <div class="form-group float-right">
                   <button class="btn btn-primary" type="submit">
                        <i class="fa fa-sliders"></i>
                        Filter
                   </button>
                   <a href="{{ route('product.index') }}" class="btn btn-info">Reset</a>
              </div>
         </div>
    </form> --}}
{{-- </div> --}}

  <div class="card">
    <h4 class="card-title"><strong>Sell History</strong></h4>

    <div class="card-body">
      @if($histories->count() > 0)
      <div class="">
        <table class="table table-responsive-sm table-bordered" data-provide="">
          <thead>
            <tr class="bg-primary">
              <th class="text-center">#</th>
              <th>Sell Date</th>
              <th>Name</th>
              <th>Unit Price:</th>
              <th>Quantity</th>
              <th>Sub Total</th>
              {{-- <th class="text-center">#</th> --}}
            </tr>
          </thead>
          <tbody>
            @foreach($histories as $key => $history)
            <tr>
              <td>{{ (isset($_GET['page']))? ($_GET['page']-1)*20+$key+1 : $key+1 }}</td>
              <td>{{ date('d/m/Y',strtotime($history->pos->sale_date)) }}</td>
              <td>{{ $history->product_name }}</td>
              <td>{{ $history->rate }}</td>
              <td>{{ $history->qty }}</td>
              <td>{{ $history->sub_total }}</td>

            </tr>
            @endforeach

          </tbody>
        </table>

        {!! $histories->appends(Request::except("_token"))->links() !!}

      </div>
      @else
      <div class="alert alert-danger" role="alert">
        <strong>Sell History Not Found!</strong>
      </div>
      @endif
    </div>
  </div>
</div>

{{-- End Modal --}}
@endsection

@section('styles')
<style>
  .table>p {
    font-size: 19px;
    padding-top: 5px;
    letter-spacing: 4px;
    margin-bottom: 0px;
  }

  .p_img {
    border: 1px solid rgb(0, 0, 0);
    padding: 5px;
  }

  @media print {
    body {
      width: 100%;
      height: 100%;
      margin: 0;
      padding: 0;
    }

    body * {
      visibility: visible;
    }

    @page {
      size: 'A4'
    }

    #barcode-page {}
  }
</style>
@endsection

@section('scripts')
<script>
    // Product View Handle
    function productView(productId) {
        let url = "{{ route('product.details', 'placeholder_id') }}".replace('placeholder_id', productId);
        $.get(url, (data) => {
            $("#product_title").text(data.name);
            $("#code").text(data.code);
            $("#ptype").text(data.type);
            $("#category").text(data.category_name);
            $("#brand").text(data.brand_name);
            $("#price").text(data.price);
            $("#cost").text(data.cost);
            $("#tax").text(data.tax);
            $("#stock").text(data.stock);
            $("#details").html(data.details);

            $("#image").attr('src', "{{ asset('link') }}".replace('link', data.image));
        });
        $("#product_details").modal('show');
    }

    // barcode Generated
    $(document).on('click', '.generated_barcode', function(){
      let code = $(this).attr('data-value');
      let url = "{{ route('generate_barcode', 'value') }}".replace('value', code);

      $.get(url, (data) => {
        let company = "{{ $pos_setting->company }}";

        let barcode = '';
        barcode += `
          <div class="text-center p-4" id="barcode">
              <table class="table table-bordered">`;
                for ($i = 0; $i < 10; $i++) {
                  barcode += `<tr>`;
                  for($j = 0; $j < 3; $j++){
                     barcode += `
                     <td>
                    ${data}
                    <p style="margin-bottom:0px">${code}</p>
                    <strong>${company}</strong>
                    </td>
                     `;
                  }
                    barcode += `</tr>`;
                  }
              barcode += `
                </table>
              </div>
              `;
           $("#barcode-page").html(barcode);
      });

      $("#bar_code_modal").modal('show');
    });



    //  Print Barcode
    function print_barcode(id) {
        $("#bar_code_modal").modal('hide');
        $(".modal-backdrop").remove();
        $(".modal").css('display', 'none');

        let mainDocBody = $('body').html();
        let printDoc = $("#barcode-page").html();
        $("body").html(printDoc);
        window.print();
        $("body").html(mainDocBody);
    }

    // Print QR Code
    function print_qrcode(doc) {

    }

</script>
@endsection
