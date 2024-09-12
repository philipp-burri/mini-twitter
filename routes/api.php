<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PostController;
use App\Http\Controllers\UserController;

Route::post('/register', [UserController::class, 'store']);

Route::group(['middleware' => ['auth:sanctum']], function(){
   Route::get('/user', [UserController::class, 'show']); 
   Route::get('/posts/{id}', [PostController::class, 'show']);
   Route::post('/posts', [PostController::class, 'store']);
   Route::get('/posts', [PostController::class, 'index']);
   Route::delete('/posts/{id}', [PostController::class, 'destroy']);
});




