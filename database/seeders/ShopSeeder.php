<?php

use App\Shop;
use Illuminate\Database\Seeder;

class ShopSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Shop::create([
            'name'=>'Main Shop',
            'is_default'=>1
        ]);

        Shop::create([
            'name'=>'New Shop',
            'is_default'=>1
        ]);
    }
}
