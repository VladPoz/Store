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
        $userId = Auth::user()->id;
        if(!$userId){
            return response()->json(['message' => 'user not found'], 404);
        }
        $product_id = Basket::query()->where('user_id', $userId)->pluck('product_id');
        if($product_id->isEmpty()){
            return response()->json(['message' => 'basket empty'], 404);
        }
        $baskets = Product::with(['images' => function($value){$value->where('is_main_image', 1);}])->whereIn('id', $product_id)
//            Сделано ИИ!!!
            ->orderByRaw('FIELD(id, ' . $product_id->implode(',') . ')')
//            Сделано ИИ!!!
            ->get();
        $basketId = Basket::query()->where('user_id', $userId)->pluck('id');
        return response()->json([$baskets, $basketId]);
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
        $user = Auth::user();
        if(!$user){
            return response()->json(['message' => 'user not found'], 404);
        }
        $basket = Basket::query()->find($id);
        if(!$basket){
            return response()->json(['message' => 'basket not found'], 404);
        }
        $basket->delete();
        return response()->json(['message' => 'basket deleted'], 200);
    }
}
