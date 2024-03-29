<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\StorePostRequest;
use App\Models\Post;
use App\Models\Comment;
use App\Models\Like;
use App\Models\User;
use App\Http\Traits\ApiResponses;
use App\Services\Api\Post\ListPostService;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\Api\Post\ListPostRequest;
use App\Http\Resources\Post\DetailPostResource;
use App\Http\Resources\Post\ListPostCollection;
use App\Services\Api\Post\DetailPostService;
use App\Services\Api\Post\StorePostService;

class PostController extends Controller
{
    use ApiResponses;
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(ListPostRequest $request)
    {
        $result = resolve(ListPostService::class)
            ->setRequest($request)
            ->handle();

        return new ListPostCollection($result);
    }

    public function myPosts()
    {
        $posts = Post::where('user_id', Auth::guard('api')->user()->id)->orderBy('created_at', 'DESC')->get();

        return $this->successResponse($posts);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StorePostRequest $request)
    {
        $result = resolve(StorePostService::class)
            ->setRequest($request)
            ->handle();

        return response()->json(['id' => $result->id]);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $post = resolve(DetailPostService::class)
            ->setModel($id)
            ->handle();

        $post->load('comments', 'author');

        return new DetailPostResource($post);

        // $post = Post::findOrFail($id);
        // $comments = Comment::where('post_id', $id)->with('user')->orderBy('created_at', 'DESC')->get();
        // foreach($comments as $comment) {
        //     $comment_like_array = Like::select('user_id')->where('object_id', $comment->id)->where('object_type', 2)->get()->toArray();
        //     $comment_like = array_column($comment_like_array, 'user_id');
        //     $comment['likes'] = $comment_like;
        // }
        // $likes_array = Like::select('user_id')->where('object_id', $id)->where('object_type', 1)->get()->toArray();
        // $likes = array_column($likes_array, 'user_id');
        // $author = User::findOrFail($post->user_id);

        // return $this->successResponse([
        //     'post' => $post,
        //     'author' => $author,
        //     'comments' => $comments,
        //     'likes' => $likes
        // ]);
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
    public function update(StorePostRequest $request, $id)
    {
        $post = Post::find($id);
        $post->title = $request->get('title');
        $post->content = $request->get('content');
        $post->save();
        return $this->successResponse('');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $post = Post::find($id);
        $comments = Comment::where('post_id', $post->id)->get();
        foreach($comments as $comment)
        {
            Like::where('object_type', config('constants.likes.object_type.comment'))
                ->where('object_id', $comment->id)
                ->delete();
        }
        Comment::where('post_id', $post->id)->delete();
        Like::where('object_type', config('constants.likes.object_type.post'))
            ->where('object_id', $post->id)
            ->delete();
        $post->delete();
        return $this->successResponse('');
    }
}
