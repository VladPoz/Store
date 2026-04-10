<?php

namespace App\Http\Controllers\v1;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    public function index()
    {
        $categories = Category::all();
        if($categories->isEmpty()){
            return response()->json($categories, 200);
        }
        return response()->json($categories, 200);
    }

    public function store(Request $request)
    {
        $user = auth()->user();
        if ($user->role_id != 2) {
            return response()->json(['message' => 'Insufficient rights'], 401);
        };
        $request->validate([
            'name' => 'required|max:24|unique:categories',
        ]);
        $category = Category::create(['name' => $request->name]);
        return response()->json('Categiry Create', 200);
    }

    public function show(string $id)
    {
        $category = Category::query()->find($id);
        if(!$category){
            return response()->json(['message' => 'No Category Found']);
        }
        return response()->json($category, 200);
    }

    public function update(Request $request, string $id)
    {
        $user = auth()->user();
        if ($user->role_id != 2) {
            return response()->json(['message' => 'Insufficient rights'], 401);
        };
        $category = Category::query()->find($id);
        if(!$category){
            return response()->json(['message' => 'No Category Found']);
        }
        $request->validate([
            'name' => 'required|max:32|unique:categories',
        ]);
        $category->update($request->all());
        return response()->json('Category update', 200);
    }

    public function destroy(string $id)
    {
        $user = auth()->user();
        if ($user->role_id != 2) {
            return response()->json(['message' => 'Insufficient rights'], 401);
        };
        $category = Category::query()->find($id);
        if(!$category){
            return response()->json(['message' => 'No Category Found']);
        };
        $category->delete();
        return response()->json('Category destroy', 200);
    }
}
