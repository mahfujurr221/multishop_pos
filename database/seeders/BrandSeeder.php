<?php

use App\Brand;
use Illuminate\Database\Seeder;

class BrandSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Brand::create([
            // 'shop_id'=>1,
            'name' => 'Apple',
            'slug' => str_slug('Apple'),
            'description' => 'Apple Brand Description'
        ]);
        Brand::create([
            // 'shop_id'=>1,
            'name' => 'Microsoft',
            'slug' => str_slug('Microsoft'),
            'description' => 'Microsoft Brand Description'
        ]);
        Brand::create([
            // 'shop_id'=>1,
            'name' => 'Nokia',
            'slug' => str_slug('Nokia'),
            'description' => 'Nokia Brand Description'
        ]);
        Brand::create([
            // 'shop_id'=>1,
            'name' => 'Samsung',
            'slug' => str_slug('Samsung'),
            'description' => 'Sumsang Brand Description'
        ]);
        Brand::create([
            // 'shop_id'=>1,
            'name' => 'Sony',
            'slug' => str_slug('Sony'),
            'description' => 'Sony Brand Description'
        ]);
    }
}
