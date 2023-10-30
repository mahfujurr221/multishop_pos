<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Product;
use App\ProductSize;
class ProductSizeController extends Controller
{
    public function delete(ProductSize $product_size)
    {
        $id = $product_size->id;
        // dd($product_size);
        $product_size->delete();

        if (ProductSize::find($id) != null) {

            session()->flash('error', 'Deletion Failed!');
            return back();
        } else {
            session()->flash('success', 'Deleted Successfully!');
            return back();
        }
    }

    public function size_stock(Request $request)
    {
        $product = Product::find($request->product_id);

        $sizes = $product->sizes;

        $data = [];

        foreach ($sizes as $size) {
            $data[] = [
                'id' => $size->id,
                'size' => $size->size,
                'stock' => $size->stock()
            ];
        }

        return $data;
    }
}
