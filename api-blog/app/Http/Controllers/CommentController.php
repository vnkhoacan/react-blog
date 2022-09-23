<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Traits\ApiResponses;
use App\Http\Requests\StoreCommentRequest;
use App\Models\Like;
use App\Models\Post;

class CommentController extends Controller
{
    use ApiResponses;
    public function store(StoreCommentRequest $request)
    {
        if($request->get('path')) {
            $path = $request->get('path').".";
            $commentList = Comment::where('post_id', $request->get('post_id'))
            ->where('path', 'like', $path . '%')
            ->get();
        } else {
            $path = $request->get('path');
            $commentList = Comment::where('post_id', $request->get('post_id'))
            ->where('path', 'not like', '%.%')
            ->get();
        }
        $commentCount = count($commentList);
        $commentCount++;
        $path = $path.$commentCount;

        $comment = new Comment;
        $comment->content = $request->get('content');
        $comment->user_id = Auth::guard('api')->user()->id;
        $comment->path = $path;
        $comment->post_id = $request->get('post_id');
        $comment->like_count = 0;
        $comment->save();
        $comment->likes = [];
        $comment->user;

        $commentPostList = Comment::where('post_id', $request->get('post_id'))->get();
        $commentPostCount = count($commentPostList);
        $post = Post::find($request->get('post_id'));
        $post->comment_count = $commentPostCount;
        $post->save();

        return $this->successResponse($comment);
    }

    public function destroy($id)
    {
        $comment = Comment::find($id);
        $childComments = Comment::where('path', 'like', $comment->path . '.%');
        $like = Like::where('object_type', config('constants.likes.object_type.comment'))
        ->where('object_id', $comment->id)->delete();
        $post = Post::find($comment->post_id);
        $post->comment_count = $post->comment_count - ($childComments->count() + 1);
        $post->save();
        $comment->delete();
        $childComments->delete();
        return $this->successResponse([]);
    }
}
