<?php

namespace App\Http\Controllers\v1;

use App\Http\Controllers\Controller;
use App\Models\Basket;
use App\Models\Product;
use Illuminate\Support\Facades\Auth;

class BasketController extends Controller
{
    //
    public function show(){
        $userId = Auth::id();
        $product_id = Basket::query()->where('user_id', $userId)->pluck('product_id');
        if($product_id->isEmpty()){
            return response()->json([], 200);
        }
        $baskets = Product::query()->whereIn('id', $product_id)
//            Сделано ИИ!!!
            ->orderByRaw('FIELD(id, ' . $product_id->implode(',') . ')')
//            Сделано ИИ!!!
            ->get();
        $baskets->load('images');
        return response()->json($baskets, 200);
    }

    public function store(string $product_id){
        $userId = Auth::user()->id;
        if(!$userId){
            return response()->json(['message' => 'user not found'], 404);
        }
        if(Basket::query()->where('user_id', $userId)->where('product_id', $product_id)->exists()){
            return response()->json(['message' => 'basket exists'], 404);
        }
        $backet = Basket::query()->create([
            'user_id' => $userId,
            'product_id' => $product_id
        ]);
        return response()->json($backet);
    }

    public function destroy(string $id){
        $userId = Auth::id();
        $basket = Basket::query()->where('user_id', $userId)->where('product_id', $id)->firstOrFail();
        $basket->delete();
        return response()->json(['message' => 'basket deleted'], 200);
    }
}
