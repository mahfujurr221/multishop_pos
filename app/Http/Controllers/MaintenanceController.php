<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\File;

class MaintenanceController extends Controller
{
    protected $products_dir;
    protected $brands_dir;
    protected $avatars_dir;
    protected $category_dir;

    public function __construct()
    {
        $this->products_dir=public_path('dashboard/images/products');
        $this->brands_dir=public_path('dashboard/images/brands');
        $this->avatars_dir=public_path('dashboard/images/avatars');
        $this->category_dir=public_path('dashboard/images/category');
    }

    public function delete_files()
    {
        // dd($this->products_dir);
        if(!File::exists($this->products_dir)){
            File::makeDirectory($this->products_dir);
        }else{
            File::cleanDirectory($this->products_dir);
        }

        if(!File::exists($this->brands_dir)){
            File::makeDirectory($this->brands_dir);
        }else{
            File::cleanDirectory($this->brands_dir);
        }

        if(!File::exists($this->avatars_dir)){
            File::makeDirectory($this->avatars_dir);
        }else{
            File::cleanDirectory($this->avatars_dir);
        }

        if(!File::exists($this->category_dir)){
            File::makeDirectory($this->category_dir);
        }else{
            File::cleanDirectory($this->category_dir);
        }

    }

    public function reset()
    {
        Artisan::call('migrate:reset');
        Artisan::call('migrate');
        Artisan::call('db:seed');

        // Delete software Files
        $this->delete_files();

        // Reset Darkmode
        Cache::forget('dark-mode');

        // clear log file
        file_put_contents(storage_path('logs/laravel.log'),'');

        // Generate New Key
        Artisan::call('key:generate');

        // Optimize software
        Artisan::call('optimize:clear');

        echo "RESET COMPLETE";
    }

    public function reset_software()
    {
        if (env('APP_MODE') == 'demo') {
            $this->reset();
            echo "Demo Reset!";
        }elseif(env('APP_MODE')=='reset'){
            $this->reset();
            echo "Reset Done!";
        }else{
            echo "Can't Reset a Software in Production Mode!";
        }
    }

    public function cache_clear()
    {
        Artisan::call('cache:clear');
        echo 'Cache Clear <br>';

        Artisan::call('config:clear');
        echo 'Config Clear <br>';

        Artisan::call('view:clear');
        echo 'View Clear <br>';
    }

}
