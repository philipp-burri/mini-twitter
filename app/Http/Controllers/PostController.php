<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
  
            $posts = Post::all();
            return $posts;
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string',
            'content' => 'required|string', 
        ]);

        Post::create([
            'title'=>$validated['title'],
            'content'=>$validated['content']

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
    public function update(Request $request, Post $post)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
{
    $post = Post::findOrFail($id);
    $post->delete();
    return response()->json(['message' => 'Post deleted successfully'], 200);
}
}
