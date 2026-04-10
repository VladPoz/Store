<?php

namespace App\Http\Controllers\v1;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\ProductImage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ProductController extends Controller
{
    public function index()
    {
        $products = Product::query()->with(['images' => function ($value){
            $value->where('is_main_image', 1);
    }])->get();
        if ($products->isEmpty()) {
            return response()->json(['message' => 'No products found.'], 404);
        };
        return response()->json($products, 200);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|max:32',
            'category_id' => 'required|exists:categories,id',
            'description' => 'required',
            'price' => 'required',
            'count' => 'required',
            'slug' => 'required|unique:products,slug',
            'images' => 'required|array',
            'images.*' => 'image|mimes:jpg,jpeg,png|max:2048',
        ]);
        $product = Product::create([
            'name' => $request->name,
            'category_id' => $request->category_id,
            'user_id' => $request->user()->id,
            'description' => $request->description,
            'price' => $request->price,
            'count' => $request->count,
            'slug' => $request->slug,
        ]);

        foreach ($request->file('images') as $image) {
            $image_check = ProductImage::query()->where('product_id', $product->id)->first();
            if (!$image_check) {
                $product_image = ProductImage::create([
                    'product_id' => $product->id,
                    'pathToImage' => $image->store('images', 'public'),
                    'is_main_image' => 1,
                ]);
            }
            $product_image = ProductImage::create([
                'product_id' => $product->id,
                'pathToImage' => $image->store('images', 'public'),
                'is_main_image' => 0,
            ]);
        }

        return response()->json(['data' => $product], 200);
    }

    public function show(string $id)
    {
        $product = Product::query()->find($id);
        if(!$product){
            return response()->json(['message' => 'No product found.'], 404);
        }
        return response()->json($product, 200);
    }

    public function profile()
    {
        $userId = Auth::user()->id;

        $product = Product::with(['images' => function ($value){
            $value->where('is_main_image', 1);
        }])->where('user_id',$userId)->get();

        if($product->isEmpty()){
            return response()->json(['message' => 'Products is empty.'], 404);
        }
        return response()->json($product, 200);
    }

    public function update(Request $request, string $id)
    {
        $product = Product::query()->find($id);
        if (!$product){
            return response()->json(['message' => 'No product found.'], 404);
        }
        $request->validate([
            'name' => 'required|max:32',
            'category_id' => 'required|exists:categories,id',
            'description' => 'required',
            'price' => 'required',
            'count' => 'required',
            'slug' => 'required',
        ]);
        $product->update([
            'name' => $request->name,
            'category_id' => $request->category_id,
            'user_id' => $request->user()->id,
            'description' => $request->description,
            'price' => $request->price,
            'count' => $request->count,
            'slug' => $request->slug,
        ]);
        return response()->json(['data' => $product], 201);
    }

    public function destroy(string $id)
    {
        $product = Product::query()->find($id);
        if (!$product){
            return response()->json(['message' => 'No product found.'], 404);
        }
        $product->delete();
        return response()->json(['data' => $product], 201);
    }
}
