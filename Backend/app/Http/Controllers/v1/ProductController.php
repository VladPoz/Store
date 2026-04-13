<?php

namespace App\Http\Controllers\v1;

use App\Http\Controllers\Controller;
use App\Http\Requests\ProductRequest;
use App\Models\Product;
use App\Models\ProductImage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class ProductController extends Controller
{
    public function index()
    {
        $products = Product::query()->get();
        $products->load('images');
        if ($products->isEmpty()) {
            return response()->json(['errors' => 'No products found.'], 404);
        };
        return response()->json($products, 200);
    }

    public function store(ProductRequest $request)
    {
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
            $path = Storage::put('images', $image);
            ProductImage::create([
                'product_id' => $product->id,
                'pathToImage' => $path,
            ]);
        };

        return response()->json('Product create', 200);
    }

    public function show(string $id)
    {
        $product = Product::query()->with('images')->find($id);
        if(!$product){
            return response()->json(['errors' => 'No product found.'], 404);
        }
        return response()->json($product, 200);
    }

    public function profile()
    {
        $userId = Auth::id();
        $product = Product::query()->where('user_id',$userId)->get();
        $product->load('images');
        return response()->json($product, 200);
    }

    public function update(Request $request, string $id)
    {
        $product = Product::query()->find($id);
        if (!$product){
            return response()->json(['errors' => 'No product found.'], 404);
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
