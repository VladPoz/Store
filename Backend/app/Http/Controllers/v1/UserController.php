<?php

namespace App\Http\Controllers\v1;

use App\Http\Controllers\Controller;
use App\Models\Role;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;

class UserController extends Controller
{
    public function index()
    {
        $user = User::all();
        if($user->isEmpty()){
            return response()->json(["message" => "Users not found"], 404);
        }
        return response()->json($user);
    }

    public function show(string $id)
    {
        $user = User::query()->find($id);
        if(!$user){
            return response()->json(["message" => "User not found"], 404);
        }
        return response()->json($user);
    }

    public function profile()
    {
        $user = Auth::user();
        if(!$user){
            return response()->json(["message" => "User not found"], 404);
        }

        $role = Role::query()->where('id', $user->role_id)->first();
        return response()->json([$user->only(['name', 'email', 'created_at']), $role->role_name]);
    }

    public function register(Request $request)
    {
        $request->validate([
            'name' => 'required|unique:users|min:3|max:32|string',
            'email' => 'required|email|unique:users',
            'password' => 'required|min:4|max:32',
        ]);
        $user = User::query()->create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role_id' => 1,
        ]);
        return response()->json(['token' => $user->createToken('User Token')->plainTextToken]);
    }

    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);
        $user = User::query()->where('email', $request->email)->first();
        if(!$user || !Hash::check($request->password, $user->password)) {
            return response()->json(['error' => 'Invalid Email or Password'], 401);
        }
        $user->tokens()->delete();
        return response()->json(['token' => $user->createToken('User Token')->plainTextToken]);
    }

    public function logout(){
        $user = Auth::user();
        if(!$user){
            return response()->json(['error' => 'User not authenticated'], 401);
        }
        $user->currentAccessToken()->delete();
        return response()->json(['message' => 'Logged out']);
    }

    public function update(Request $request)
    {
        $user = Auth::user();
        if(!$user){
            return response()->json(['massage' => 'User not authenticated'], 404);
        }
        $data = $request->validate([
            'name' => ['required', 'min:3', 'max:32', 'string', Rule::unique('users')->ignore($user->id)],
            'email' => ['required', 'email', Rule::unique('users')->ignore($user->id)],
            'password' => 'required|min:4|max:32',
        ]);
        $user->query()->update([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);
        return response()->json(['message' => 'Update success']);
    }

    public function destroy()
    {
        $user = Auth::user();
        if(!$user){
            return response()->json(['massage' => 'User not authenticated'], 404);
        }
        $user->delete();
        return response()->json(['massage' => 'Delete success']);
    }
}
