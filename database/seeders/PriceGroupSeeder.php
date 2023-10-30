<?php

// namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\PriceGroup;

class PriceGroupSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        PriceGroup::create([
            'name'=>'Fixed Price'
        ]);

        PriceGroup::create([
            'name'=>'Retail Price'
        ]);

        PriceGroup::create([
            'name'=>'Whole Sale'
        ]);
    }
}
