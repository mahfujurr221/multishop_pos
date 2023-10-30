<?php

use App\Unit;
use Illuminate\Database\Seeder;

class UnitSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $piece = Unit::create([
            // 'shop_id'=>1,
            'name'=>'pc',
            'default'=>1
        ]);

        Unit::create([
            // 'shop_id'=>1,
            'name'=>'Dozen',
            'related_to_unit_id'=>$piece->id,
            'related_sign'=>'*',
            'related_by'=>12
        ]);

        $gm = Unit::create([
            // 'shop_id'=>1,
            'name'=>'gm'
        ]);


        Unit::create([
            // 'shop_id'=>1,
            'name'=>'Kg',
            'related_to_unit_id'=>$gm->id,
            'related_sign'=>'*',
            'related_by'=>1000
        ]);

        $ml = Unit::create([
            // 'shop_id'=>1,
            'name'=>'ml'
        ]);


        Unit::create([
            // 'shop_id'=>1,
            'name'=>'Litre',
            'related_to_unit_id'=>$ml->id,
            'related_sign'=>'*',
            'related_by'=>1000
        ]);

    }
}
