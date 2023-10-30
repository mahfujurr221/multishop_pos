<?php

// namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\OrderStatus;
class OrderStatusSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
         OrderStatus::truncate();

        OrderStatus::create(['name' => 'Processing']);
        OrderStatus::create(['name' => 'Accept']);
        OrderStatus::create(['name' => 'Pick Up']);
        OrderStatus::create(['name' => 'Hold']);
        OrderStatus::create(['name' => 'Delivered']);
        OrderStatus::create(['name' => 'Complete']);
    }
}
