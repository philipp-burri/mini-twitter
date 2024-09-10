<?php



use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\PostController;

Route::get('/users-info', [UserController::class, 'index']);
Route::get('/posts', [PostController::class, 'index']);
