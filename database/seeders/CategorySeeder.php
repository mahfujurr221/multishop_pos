<?php

use App\Category;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Category::create([
            // 'shop_id'=>1,
            'name' => 'Electronics',
            // 'code' => '45478'
        ]);
        Category::create([
            // 'shop_id'=>1,
            'name' => 'House',
            // 'code' => '7845'
        ]);
        Category::create([
            // 'shop_id'=>1,
            'name' => 'Fashion',
            // 'code' => '8956'
        ]);
        Category::create([
            // 'shop_id'=>1,
            'name' => 'Hardware',
            // 'code' => '3543434'
        ]);
        Category::create([
            // 'shop_id'=>1,
            'name' => 'Document',
            // 'code' => '343342'
        ]);
    }
}
