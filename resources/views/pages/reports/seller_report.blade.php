@extends('layouts.master')
@section('title', 'Sellers List')

@section('page-header')
<header class="header bg-ui-general">
     <div class="header-info">
          <h1 class="header-title">
               <strong>Seller Report</strong>
          </h1>
     </div>

</header>
@endsection

@section('content')

<div class="col-12">
     <div class="card">
          <h4 class="card-title"><strong>Seller Report</strong></h4>

          <div class="card-body card-body-soft">
               @if($users->count() > 0)
               <div class="table-responsive-sm table-bordered">
                    <table class="table table-soft">
                         <thead>
                              <tr class="bg-primary">
                                   <th>#</th>
                                   <th>Name</th>
                                   <th>Avater</th>
                                   <th>Email</th>
                                   <th>Role</th>
                                   <th>Sales Amount</th>
                              </tr>
                         </thead>

                         <tbody>
                              @foreach ($users as $key => $item)
                              <tr>
                                   <td>{{ ++$key }}</td>
                                   <td>{{ ucfirst($item->fname ) }} {{ ucfirst($item->lname ) }}</td>
                                   <td>
                                        <img src="{{ asset($item->profile->avatar) }}" alt="Avatar" width="60">
                                   </td>
                                   <td>{{ $item->email }}</td>
                                   <td>
                                        @foreach($item->getRoleNames() as $role)
                                             {{ ucfirst($role) }},
                                        @endforeach
                                   </td>
                                   <td>{{ $item->sales_amount() }}</td>
                              </tr>
                              @endforeach
                         </tbody>

                    </table>
                    {{ $users->links() }}
               </div>
               @else
               <div class="alert alert-danger" role="alert">
                    <strong>You have no Users</strong>
               </div>
               @endif
          </div>
     </div>
</div>
@endsection

@section('styles')
<style>
     .table tr td {
          vertical-align: middle;
          padding: 5px;
          text-align: center;
          font-weight: 500;
     }

     .table tr th {
          text-align: center;
     }
</style>
@endsection

@section('scripts')
    @include('includes.delete-alert')
@endsection