<?php

use App\BankAccount;
use Illuminate\Database\Seeder;

class BankAccountSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        BankAccount::create([
            'shop_id'=>1,
            'name' => 'CASH',
            'default'=>1
        ]);

         BankAccount::create([
            'shop_id'=>2,
            'name' => 'CASH',
            'default'=>1
        ]);
    }
}
