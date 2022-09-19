<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Post;
use App\Models\Comment;
use App\Models\Like;
use App\Models\User;
use App\Http\Traits\ApiResponses;

class PostController extends Controller
{
    use ApiResponses;
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $post = Post::all();

        return $this->successResponse($post);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {

    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $post = Post::findOrFail($id);
        $comments = Comment::where('post_id', $id)->with('user')->get();
        foreach($comments as $comment) {
            $comment_like_array = Like::select('user_id')->where('object_id', $comment->id)->where('object_type', 2)->get()->toArray();
            $comment_like = array_column($comment_like_array, 'user_id');
            $comment['likes'] = $comment_like;
        }
        $likes_array = Like::select('user_id')->where('object_id', $id)->where('object_type', 1)->get()->toArray();
        $likes = array_column($likes_array, 'user_id');
        $author = User::findOrFail($post->user_id);

        return $this->successResponse([
            'post' => $post,
            'author' => $author,
            'comments' => $comments,
            'likes' => $likes
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
