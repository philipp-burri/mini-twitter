<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PostController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\FriendshipController;


Route::put('/posts/{id}' , [PostController::class, 'update']);

Route::group(['middleware' => ['auth:sanctum']], function(){
   Route::get('/user', [UserController::class, 'show']); 
   Route::get('/users', [UserController::class, 'showAll']); 
   Route::get('posts/my-posts', [PostController::class, 'getMyPosts']);
   Route::get('posts/user/{id}', [PostController::class, 'getByUserId']);
   Route::get('/posts/{id}', [PostController::class, 'show']);



   Route::post('/friends/add/{user}', [FriendshipController::class, 'addFriend'])->name('add.friend');
   Route::post('/friends/remove/{friend}', [FriendshipController::class, 'removeFriend'])->name('friends.remove');
   Route::get('/friends', [FriendshipController::class, 'listFriends'])->name('friends.list');

   Route::post('/posts', [PostController::class, 'store']);
   Route::get('/posts', [PostController::class, 'index']);
   Route::delete('/posts/{id}', [PostController::class, 'destroy']);
});




