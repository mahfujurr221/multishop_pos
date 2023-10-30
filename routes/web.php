<?php

use App\Pos;
use App\Product;
use App\Stock;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;


Route::prefix('back')->middleware(['auth'])->group(function () {

    Route::get('pos/add_payment/{pos}', 'PosController@add_payment')->name('pos.add_payment');
    Route::post('pos/add_payment/{pos}', 'PosController@store_payment');

    //Add Customer(Ajax)
    Route::get('pos/add_customer', 'PosController@add_customer')->name('pos.add_customer');
    Route::post('pos/add_customer', 'PosController@store_customer');

    Route::get('pos/purchase-cost-breakdown/{pos}', 'PosController@purchase_cost_breakdown')->name('pos.purchase_cost_breakdown');
    Route::resource('pos', 'PosController');
    Route::get('online-sale', 'PosController@online_sales')->name('sales.online');
    Route::get('change-order-status', 'PosController@change_order_status')->name('change.order_status');
    Route::post('pos/partial-destroy/{id}', 'PosController@partial_destroy')->name('pos.partial_destroy');
    Route::get('pos-products', 'PosController@pos_products')->name('pos.products');
    Route::get('pos-item-product/{posid}', 'PosController@pos_item_product_id')->name('pos.item_product_id');
    Route::post('product-scan', 'PosController@get_product')->name('get_product');
    Route::get('pos-receipt/{pos_id}', 'PosController@pos_receipt')->name('pos_receipt');
    Route::get('pos-general-sale-receipt/{pos_id}', 'PosController@pos_general_sale_receipt')->name('pos_general_sale_receipt');
    Route::get('pos-online-sale-receipt/{pos_id}', 'PosController@pos_online_sale_receipt')->name('pos_online_sale_receipt');

    Route::get('chalan-receipt/{pos_id}', 'PosController@chalan_receipt')->name('chalan_receipt');


    // Search
    Route::get('product-search', 'PosController@product_search_by_name')->name('product-search');
    Route::get('product-code-search', 'PosController@product_search_by_code')->name('product-code-search');


    Route::post('product/transfer/store','ProductController@store_transfer')->name('product.store_transfer');

    Route::get('back/product/{product}', 'ProductController@show')->name('product.show');

    // Profile
    Route::get('profile', 'ProfileController@index')->name('profile.index');
    Route::post('profile', 'ProfileController@update')->name('profile.update');
    Route::get('change-password', 'ProfileController@change_password')->name('change.password');
    Route::post('update-password', 'ProfileController@update_password')->name('update.password');

    // Product Details
    Route::get('product/{product}/details', 'ProductController@details')->name('product.details');
    Route::get('size_stock', 'ProductSizeController@size_stock')->name('size_stock');

    Route::resource('shops', ShopController::class);

    Route::get('change-active-shop', 'ShopController@change_active')->name('shops.change_active');

    Route::get('unit/{unit}/get_related', 'UnitController@get_related')->name('unit.get_related');
    Route::resource('unit', UnitController::class)->except(['show']);

    Route::resource('owners', 'OwnerController')->except(['show']);
    Route::get('bank_account/add_money/{bank_account}', 'BankAccountController@add_money')->name('bank_account.add_money');
    Route::post('bank_account/add_money', 'BankAccountController@add_money_store')->name('bank_account.add_money.store');
    Route::get('bank_account/withdraw_money/{bank_account}', 'BankAccountController@withdraw_money')->name('bank_account.withdraw_money');
    Route::post('bank_account/withdraw_money', 'BankAccountController@withdraw_money_store')->name('bank_account.withdraw_money.store');
    Route::resource('bank_account', 'BankAccountController');
    Route::get('bank_account/transfer/{account}', 'BankAccountController@transfer')->name('bank_account.transfer');
    Route::post('bank_account/transfer/', 'BankAccountController@transfer_store')->name('bank_account.transfer_store');
    Route::get('bank_account/history/{account}', 'BankAccountController@history')->name('bank_account.history');
    Route::resource('bank_to_bank_transection', 'AccountToAccountTransectionController');


    Route::resource('brand', 'BrandController');
    Route::get('import-brand', 'BrandController@import')->name('brand.import');
    Route::post('import-brand', 'BrandController@import_store')->name('brand.import_store');
    Route::resource('category', 'CategoryController');
    Route::resource('supplier', 'SupplierController');


    Route::get('customer/wallet_payment/{customer}', 'CustomerController@wallet_payment')->name('customer.wallet_payment');
    Route::post('customer/wallet_payment/{customer}', 'CustomerController@store_wallet_payment');
    Route::resource('customer', 'CustomerController');


    // ****** PRODUCT *******
    Route::resource('product', 'ProductController')->except(['show']);
    Route::get('product/sell_history/{product}', 'ProductController@sell_history')->name('product.sell_history');
    Route::get('product/categories', 'ProductController@categories')->name('product.categories');
    Route::get('product/brands', 'ProductController@brands')->name('product.brands');

    Route::get('product/add_category', 'ProductController@add_category')->name('product.add_category');
    Route::post('product/add_category', 'ProductController@store_category');


    Route::get('product/add_brand', 'ProductController@add_brand')->name('product.add_brand');
    Route::post('product/add_brand', 'ProductController@store_brand');
   
    Route::delete('product_size/delete/{product_size}', 'ProductSizeController@delete')->name('product_size.destroy');

    // ****** Product Transfer*******
    Route::get('transfer/received', 'ProductTransferController@transfer_received')->name('transfer_received');
    Route::get('transfer/received/{id}/accept/','ProductTransferController@transfer_received_accept');

    Route::post('transfer/received/store','ProductTransferController@transfer_received_store')->name('transfer_received_store');
    Route::resource('product-transfer', 'ProductTransferController')->except(['show']);


    Route::get('supplier/wallet_payment/{supplier}', 'SupplierController@wallet_payment')->name('supplier.wallet_payment');
    Route::post('supplier/wallet_payment/{supplier}', 'SupplierController@store_wallet_payment');
    Route::resource('supplier', 'SupplierController');

    Route::get('purchase/add_payment/{purchase}', 'PurchaseController@add_payment')->name('purchase.add_payment');
    Route::post('purchase/add_payment/{purchase}', 'PurchaseController@store_payment');
    Route::get('purchase/add_supplier', 'PurchaseController@add_supplier')->name('purchase.add_supplier');
    Route::post('purchase/add_supplier', 'PurchaseController@store_supplier');
    Route::resource('purchase', 'PurchaseController');

    Route::get('purchase-receipt/{id}', 'PurchaseController@receipt')->name('purchase.receipt');
    Route::get('purchase-item-product/{purchaseId}', 'PurchaseController@purchase_item_product_id')->name('purchase.item_product_id');
    Route::post('purchase/partial-destroy/{id}', 'PurchaseController@partial_destroy')->name('purchase.partial_destroy');

    Route::resource('expense-category', 'ExpenseCategoryController');
    Route::resource('expense', 'ExpenseController');

    // ajax Request
    Route::get('customers', 'CustomerController@customers')->name('get_customers');
    Route::get('customer-due/{id}', 'CustomerController@customer_due')->name('customer_due');
    Route::get('suppliers', 'SupplierController@suppliers')->name('get_suppliers');
    Route::get('supplier-due/{id}', 'SupplierController@supplier_due')->name('supplier_due');


    // Stock
    Route::get('stock', 'StockController@index')->name('stock.index');

    // Payments
    Route::get('payment', 'PaymentController@index')->name('payment.index');
    Route::get('payment/create', 'PaymentController@create')->name('payment.create');
    Route::get('payment/supplier/create', 'PaymentController@supplier_create')->name('payment.supplier.create');
    Route::get('payment/customer/create', 'PaymentController@customer_create')->name('payment.customer.create');
    Route::post('payment', 'PaymentController@store')->name('payment.store');
    Route::delete('payment/{payment}', 'PaymentController@destroy')->name('payment.destroy');
    Route::get('payment-receipt/{actual_payment}', 'PaymentController@payment_receipt')->name('payment_receipt');

    Route::delete('payment/partial_delete/{payment}', 'PaymentController@partial_delete')->name('payment.partial_delete');

    // Payment Method
    Route::resource('payment_method', 'PaymentMethodController');

    // Barcode
    Route::get('product-barcode/{code}', 'ProductController@barcode_generate')->name('generate_barcode');

    //Settings
    // Route::get('setting', 'SettingController@index')->name('apps.setting');
    // Route::post('setting', 'SettingController@setting_update')->name('apps.setting_update');
    Route::get('setting', 'SettingController@create_pos_setting')->name('pos.pos_setting');
    Route::post('setting', 'SettingController@update_pos_setting')->name('pos.pos_setting_update');


    Route::resource('roles', 'RoleController')->except('show');
    Route::resource('role_permissions', 'RolePermissionController')->parameters([
        'role_permissions' => 'role'
    ])->only('edit', 'update');

    Route::resource('users','UserController')->except('show');

    // Reports
    Route::get('report/today_report', 'ReportController@today_report')->name('today_report');
    Route::get('report/current_month_report', 'ReportController@current_month_report')->name('current_month_report');
    Route::get('report/summary-report', 'ReportController@summary_report')->name('summary_report');
    Route::get('report/daily_report', 'ReportController@daily_report')->name('daily_report');
    Route::get('report/seller', 'ReportController@seller_report')->name('report.seller_report');
    Route::get('report/customer_due', 'ReportController@customer_due')->name('report.customer_due');
    Route::get('report/supplier_due', 'ReportController@supplier_due')->name('report.supplier_due');
    Route::get('report/low_stock', 'ReportController@low_stock')->name('report.low_stock');
    Route::get('report/top_buying_customer', 'ReportController@top_customer')->name('report.top_customer');
    Route::get('report/top_selling_product', 'ReportController@top_product')->name('report.top_product');
    Route::get('report/top-selling-product-alltime', 'ReportController@top_product_all_time')->name('report.top_product_all_time');
    Route::get('report/purchase_report', 'ReportController@purchase_report')->name('report.purchase_report');
    Route::get('report/customer_ledger', 'ReportController@customer_ledger')->name('report.customer_ledger');
    Route::get('report/supplier_ledger', 'ReportController@supplier_ledger')->name('report.supplier_ledger');
    Route::get('report/profit_loss_report', 'ReportController@profit_loss_report')->name('report.profit_loss_report');

    // All Shop Report
    Route::get('report/all_daily_report', 'ReportController@all_daily_report')->name('all_daily_report');


    Route::resource('damage', 'DamageController');

    // POS- Return
    Route::get('return/add_payment/{return}', 'OrderReturnController@add_payment')->name('return.add_payment');
    Route::post('return/add_payment/{return}', 'OrderReturnController@store_payment');

    Route::get('return/{pos}', 'OrderReturnController@create')->name('pos.return');
    Route::post('return/{pos}', 'OrderReturnController@store');
    Route::resource('return', 'OrderReturnController')->except(['create', 'store', 'edit', 'update']);

    // promotion sms
    Route::get('promotion-sms', 'PromotionController@promotion_sms')->name('promotion.sms');
    Route::post('promotion-sms-send', 'PromotionController@send_promotion_sms')->name('send.promotion.sms');
    Route::get('/backup', 'HomeController@backup')->name('backup');

    // Area
    Route::resource('area', 'AreaController');

    //
    Route::resource('delivery-agent', 'DeliveryAgentController');
    
    
});
// Axios Request data
// Route::get('customers', 'CustomerController@customers');
// Route::get('ajax-products', 'ProductController@products')->name('ajax-products');

Route::get('/', 'HomeController@front_home');

Auth::routes();

Route::get('/back', 'HomeController@index')->middleware('auth', 'is_shop_selected')->name('admin');

Route::get('clear', 'MaintenanceController@cache_clear');
Route::get('/db_reset', 'MaintenanceController@reset_software');


Route::get('test',function(){
    // dd(\App\PurchaseItem::withoutGlobalScopes()->find(1));
   $stock=Stock::first();
//    dd($stock);
   dd($stock->purchase_item->update_remaining());     
});


