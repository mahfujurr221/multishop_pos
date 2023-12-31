<?php

use App\Customer;
use Illuminate\Database\Seeder;

class CustomerSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Customer::create([
            // 'shop_id'=>1,
            'name' => 'Sakib Rabby',
            'email' => 'sakib@gmail.com',
            'phone' => '0184578745',
            'address' => 'Address'
        ]);
        Customer::create([
            // 'shop_id'=>1,
            'name' => 'Md Juwel Khan',
            'email' => 'juwel@gmail.com',
            'phone' => '01845784545',
            'address' => 'Address'
        ]);
        Customer::create([
            // 'shop_id'=>1,
            'name' => 'Md Sumon',
            'email' => 'sumon@gmail.com',
            'phone' => '01847898745',
            'address' => 'Address'
        ]);
        Customer::create([
            // 'shop_id'=>1,
            'name' => 'Mahmudul Hasan',
            'email' => 'mahmud@gmail.com',
            'phone' => '0198784545',
            'address' => 'Address'
        ]);
    }
}
