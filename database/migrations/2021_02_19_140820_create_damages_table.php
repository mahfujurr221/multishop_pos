<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDamagesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('damages', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->integer('shop_id');

            $table->integer('product_id');
            // $table->unsignedBigInteger('size_id')->nullable();
            $table->unsignedBigInteger('product_variation_id')->nullable();
            $table->unsignedInteger('transfer_product_id')->nullable();
            $table->integer('qty');
            $table->integer('main_unit_qty')->nullable();
            $table->integer('sub_unit_qty')->nullable();

            $table->date('date');
            $table->text('note')->nullable();
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
        Schema::dropIfExists('damages');
    }
}
