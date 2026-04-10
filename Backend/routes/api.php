<?php

use App\Http\Controllers\v1\CategoryController;
use App\Http\Controllers\v1\ProductController;
use App\Http\Controllers\v1\ProductCommentsController;
use App\Http\Controllers\v1\UserController;
use App\Http\Controllers\v1\BasketController;
use Illuminate\Support\Facades\Route;

Route::prefix('v1')->group(function () {
    Route::prefix('auth')->group(function () {
        Route::post('register', [UserController::class, 'register']);
        Route::post('login', [UserController::class, 'login']);
        Route::post('logout', [UserController::class, 'logout'])->middleware('auth:sanctum');
    });
    Route::prefix('user')->group(function () {
        Route::get('/', [UserController::class, 'index']);
        Route::get('profile', [UserController::class, 'profile'])->middleware('auth:sanctum');
        Route::put('update', [UserController::class, 'update'])->middleware('auth:sanctum');
        Route::delete('destroy', [UserController::class, 'destroy'])->middleware('auth:sanctum');
        Route::get('/{id}', [UserController::class, 'show']);
    });
    Route::prefix('category')->group(function () {
        Route::get('/', [CategoryController::class, 'index']);
        Route::post('store', [CategoryController::class, 'store'])->middleware('auth:sanctum');
        Route::put('update/{id}', [CategoryController::class, 'update'])->middleware('auth:sanctum');
        Route::delete('destroy/{id}', [CategoryController::class, 'destroy'])->middleware('auth:sanctum');
        Route::get('/{id}', [CategoryController::class, 'show']);
    });
    Route::prefix('product')->group(function () {
        Route::get('/', [ProductController::class, 'index']);
        Route::get('profile', [ProductController::class, 'profile'])->middleware('auth:sanctum');
        Route::post('store', [ProductController::class, 'store'])->middleware('auth:sanctum');
        Route::put('update/{id}', [ProductController::class, 'update'])->middleware('auth:sanctum');
        Route::delete('destroy/{id}', [ProductController::class, 'destroy'])->middleware('auth:sanctum');
        Route::get('/{id}', [ProductController::class, 'show']);

        Route::prefix('{product_id}/comment')->group(function () {
            Route::get('/', [ProductCommentsController::class, 'show_all']);
            Route::post('store', [ProductCommentsController::class, 'store'])->middleware('auth:sanctum');
            Route::put('{id}/update', [ProductCommentsController::class, 'update'])->middleware('auth:sanctum');
            Route::delete('{id}/destroy', [ProductCommentsController::class, 'destroy'])->middleware('auth:sanctum');
            Route::get('/{id}', [ProductCommentsController::class, 'show']);
        });
        Route::post('{product_id}/basket', [BasketController::class, 'store'])->middleware('auth:sanctum');
    });
    Route::middleware('auth:sanctum')->prefix('basket')->group(function () {
        Route::get('/', [BasketController::class, 'show']);
        Route::delete('{id}/destroy', [BasketController::class, 'destroy']);
    });
});
