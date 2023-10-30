<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProductTransferItemsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('product_transfer_items', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('product_transfer_id')->nullable();
            $table->integer('product_id');
            $table->string('product_name');
            $table->integer('main_unit_qty')->nullable();
            $table->integer('sub_unit_qty')->nullable();
            $table->integer('qty');
            $table->decimal('rate',10,2);
            $table->unsignedBigInteger('product_variation_id')->nullable();
            $table->decimal('sub_total',12,2);
            // remaining quantity
            $table->integer('remaining')->default(0);
            $table->timestamps();
            
           // $table->foreign('product_transfer_id')->references('id')->on('product_transfers')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('product_transfer_items');
    }
}
