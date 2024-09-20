<?php

namespace App\Http\Controllers;
use App\Models\User;
use Illuminate\Http\Request;

class FriendshipController extends Controller
{


    public function addFriend(User $user)
    {
        $currentUser = auth()->user();

        $currentUser->sendFriendRequest($user);

        return response()->json(['message' => 'Friend request sent succesfully'], 200);
    }
}
