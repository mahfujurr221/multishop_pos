<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePurchaseItemsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('purchase_items', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->integer('shop_id');

            $table->unsignedInteger('purchase_id');
            $table->unsignedInteger('product_id');
            $table->unsignedInteger('transfer_product_id')->nullable();
            $table->decimal('rate',10,2);

            $table->integer('main_unit_qty')->nullable();
            $table->integer('sub_unit_qty')->nullable();
            $table->integer('qty');

            $table->decimal('sub_total',12,2);
            // remaining quantity
            $table->integer('remaining')->default(0);
            $table->unsignedBigInteger('product_variation_id')->nullable();
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
        Schema::dropIfExists('purchase_items');
    }
}
