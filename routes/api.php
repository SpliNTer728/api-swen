<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PostController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\BookingController;
use App\Http\Controllers\ScheduleController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ProductController;

Route::apiResource('posts', PostController::class);

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout'])
->middleware('auth:sanctum');


Route::middleware('auth:sanctum')->group(function () {

    // User
    Route::get('/user', [UserController::class, 'index']);
    Route::get('/user/{id}', [UserController::class, 'show']);
    Route::get('/users', [UserController::class, 'indexAll']);

    // schedule
    Route::get('/schedule', [ScheduleController::class, 'index']);
    Route::get('/schedule/slots', [ScheduleController::class, 'index']);

    // booking
    Route::get('/booking', [BookingController::class, 'index']);

    // products
    Route::get('/products', [ProductController::class, 'index']);
    Route::get('/products/slots', [ProductController::class, 'indexSlots']);
    Route::get('/products/formules', [ProductController::class, 'indexFormules']);
});

