<?php

namespace App\Http\Controllers\v1;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Http\Requests\Auth\RegisterRequest;
use App\Http\Requests\UserUpdateRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

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
            return response()->json('User not found', 404);
        }
        return response()->json($user);
    }

    public function profile()
    {
        $user = Auth::user();
        $user->load('role');
        return response()->json($user, 200);
    }

    public function register(RegisterRequest $request)
    {
        $user = User::query()->create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role_id' => 1,
        ]);
        return response()->json(['token' => $user->createToken('token')->plainTextToken]);
    }

    public function login(LoginRequest $request)
    {
        if(!Auth::attempt(['email' => $request->email, 'password' => $request->password])){
            return response()->json(['errors' => ['Invalid Email or Password']], 422);
        }

        $user = Auth::user();
        return response()->json(['token' => $user->createToken('token')->plainTextToken]);
    }

    public function logout(){
        $user = Auth::user();
        if(!$user){
            return response()->json(['err' => 'User not authenticated'], 401);
        }
        $user->currentAccessToken()->delete();
        return response()->json(['message' => 'Logged out']);
    }

    public function update(UserUpdateRequest $request)
    {
        $user = Auth::user();
        $user->update([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);
        return response()->json('Update success', 200);
    }

    public function destroy()
    {
        $user = Auth::user();
        $user->delete();
        return response()->json(['massage' => 'Delete success']);
    }
}
