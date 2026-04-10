<?php

namespace App\Http\Controllers\v1;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\ProductComments;
use Illuminate\Http\Request;

class ProductCommentsController extends Controller
{
    public function show_all(string $product_id)
    {
        $comments = ProductComments::query()->where('product_id', $product_id)->get();
        if ($comments->isEmpty()) {
            return response()->json(['message' => "No Comments found"], 404);
        }
        return response()->json($comments);
    }

    public function store(Request $request, string $product_id)
    {

        $request->validate([
            'comment' => 'required',
            'rating' => 'required',
        ]);
        $comment = ProductComments::create([
            'product_id' => $product_id,
            'user_id' => $request->user()->id,
            'comment' => $request->comment,
            'rating' => $request->rating,
        ]);
        return response()->json($comment, 200);
    }

    public function show(string $product_id, string $id)
    {
        $comments = ProductComments::query()->where('product_id', $product_id)->find($id);
        if (!$comments){
            return response()->json(['message' => "No Comments found"], 404);
        }
        return response()->json($comments);
    }

    public function update(Request $request, string $product_id, string $id)
    {
        $comments = ProductComments::query()->where('product_id', $product_id)->find($id);

        if (!$comments){
            return response()->json(['message' => "No Comments found"], 404);
        }
        $request->validate([
            'comment' => 'required',
            'rating' => 'required',
        ]);
        $comments->update([
            'comment' => $request->comment,
            'rating' => $request->rating,
        ]);
        return response()->json($comments);
    }

    public function destroy(string $id)
    {
        $comments = ProductComments::query()->find($id);
        if (!$comments){
            return response()->json(['message' => "No Comments found"], 404);
        }
        $comments->delete();
        return response()->json(['message' => "Comment deleted"], 200);
    }
}
