<?php

// namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\DeliveryAgent;
class DeliveryAgentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DeliveryAgent::create([
            'name' => 'RedX'
        ]);

        DeliveryAgent::create([
            'name' => 'Pathao'
        ]);

        DeliveryAgent::create([
            'name' => 'Paperfly'
        ]);

        DeliveryAgent::create([
            'name' => 'eCourier'
        ]);

        DeliveryAgent::create([
            'name' => 'S.A Paribahan'
        ]);

        DeliveryAgent::create([
            'name' => 'Sundarban'
        ]);

        DeliveryAgent::create([
            'name' => 'GoGo Bangla'
        ]);
    }
}
