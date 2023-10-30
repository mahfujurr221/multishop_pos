<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateShopProductStocksTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('shop_product_stocks', function (Blueprint $table) {
            $table->id();
            $table->integer('shop_id');
            $table->integer('product_id');
            $table->integer('stock')->default(0);
            $table->integer('main_unit_stock')->default(0);
            $table->integer('sub_unit_stock')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('shop_product_stocks');
    }
}
