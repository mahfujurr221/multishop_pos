<?php

namespace App\Http\Livewire\Damage;

use App\Product;
use App\ProductSize;
use App\ProductVariation;
use Livewire\Component;

class ProductUnit extends Component
{
    public  $selected_product="";
    public $product;

    public $main_qty = 0;
    public $sub_qty = 0;
    
    public $selected_variation="";

    protected $rules=[
        'selected_variation'=>'required'
    ];

    public function mount()
    {
        // $this->updatedSelectedProduct();
        if($this->selected_product!=""){
            $this->product=Product::find($this->selected_product);

            $quanity=$this->product->separate_main_sub_qty($this->product->stock());

            $this->main_qty = $quanity['main_qty'];
            $this->sub_qty = $quanity['sub_qty'];
        }

        if($this->selected_variation!=""){
                $quanity=$this->product->separate_main_sub_qty(ProductVariation::find($this->selected_variation)->stock());
                $this->main_qty = $quanity['main_qty'];
                $this->sub_qty = $quanity['sub_qty'];
        }
    }

    public function updatedSelectedProduct($value="")
    {
        // dd($value);
        if($value==""){
            $this->product=null;
        }

        $this->product=Product::find($value);

        if($this->selected_variation!=""){
            $quanity=$this->product->separate_main_sub_qty(ProductVariation::find($this->selected_variation)->stock());
            $this->main_qty = $quanity['main_qty'];
            $this->sub_qty = $quanity['sub_qty'];
        }

    }
    public function updatedSelectedSize($value="")
    {
        if($value==""){
            $this->selected_size="";
        }
            $this->selected_size = $value;
            // ProductSize::find($value);
            // dump($this->selected_size);
            $quanity=$this->product->separate_main_sub_qty(ProductSize::find($this->selected_variation)->stock());
            $this->main_qty = $quanity['main_qty'];
            $this->sub_qty = $quanity['sub_qty'];
    }
    public function render()
    {
        return view('livewire.damage.product-unit');
    }
}
