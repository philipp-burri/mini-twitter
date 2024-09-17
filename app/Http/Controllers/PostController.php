<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\User;
use Illuminate\Http\Request;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
  
        $posts = Post::with('user:id,name')->latest()->get();
        return response()->json($posts);
    }

    public function getMyPosts(Request $request)
    {
        $posts = Post::where('user_id', '=', $request->user()->id)->get();
        return response()->json(['data' => $posts], 200);
    }

    public function getByUserId(Request $request, $user_id)
    {
        $posts = Post::where('user_id', '=', $request->user()->id)->get();
        return response()->json(['data' => $posts], 200);

    }

    public function getByUserName(Request $request, $user_id)
    {
        $posts = Post::where('user_id', '=', $request->user()->id)->get();
        return response()->json(['data' => $posts], 200);

    }
    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string',
            'content' => 'required|string', 
            'user_id' => $request->user()
        ]);

        Post::create([
            'title'=>$validated['title'],
            'content'=>$validated['content'],
            'user_id'=>$request->user()->id

        ]);

        return response()->json(['message' => 'Post created succesfully'], 201);
    }
    /**
     * Display the specified resource.
     */
    public function show(Request $request, $id)
    {
        $post = Post::find($id);
        return response()->json($post, 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'title' => 'required|string',
            'content' => 'required|string', 
        ]);

        $post = Post::findOrFail($id);

        if($request->user()->id !== $post->user->id){
            return response()->json(['message' => 'You are not the owner!'], 402);
        }

        $post->update([
            'title'=>$validated['title'],
            'content'=>$validated['content']
        ]);

        $post->save();

        return response()->json(['message' => 'Post updated succesfully'], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy (Request $request, $id)
{
    $post = Post::findOrFail($id);
    if($request->user()->id !== $post->user->id){
        return response()->json(['message' => 'You are not the owner!'], 402);
    }
    $post->delete();
    return response()->json(['message' => 'Post deleted successfully'], 204);
}
}
