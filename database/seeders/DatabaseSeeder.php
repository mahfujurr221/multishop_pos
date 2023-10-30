<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {

        $this->call(ShopSeeder::class);
        $this->call(UnitSeeder::class);
        $this->call(BankAccountSeeder::class);
        // Supplier Seeder Because of Default Supplier
        $this->call(SupplierSeeder::class);
        $this->call(PriceGroupSeeder::class);
        $this->call(PaymentMethodSeeder::class);
        $this->call(RolesSeeder::class);
        $this->call(PermissionSeeder::class);
        $this->call(UsersTableSeeder::class);
        $this->call(SettingSeeder::class);
        $this->call(OrderStatusSeeder::class);
        $this->call(DeliveryAgentSeeder::class);

        // Load Testing Seeder
        // $this->call(LoadTestSeeder::class);

        if (env('APP_MODE') == 'demo') {
            $this->call(DeliveryMethodSeeder::class);

            $this->call(CategorySeeder::class);
            $this->call(BrandSeeder::class);
            $this->call(CustomerSeeder::class);
            $this->call(ProductSeeder::class);
        }
    }
}
