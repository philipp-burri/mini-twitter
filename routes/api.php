<?php



use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;

Route::get('/users-info', [UserController::class, 'index']);

