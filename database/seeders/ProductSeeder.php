<?php

use App\Product;
use App\Services\ProductService;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $product = Product::create([
            // 'shop_id'=>1,
            // 'type' => 'standard',
            'name' => 'Mobile Phone',
            'code' => '000001',
            'category_id' => random_int(1, 5),
            'brand_id' => random_int(1, 5),
            'cost' => 4150,
            'price' => 4500,
            'image' => 'dashboard/images/not-available.png',
            'main_unit_id'=>1
        ]);


    }
}
