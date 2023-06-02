<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Like;
use App\Http\Traits\ApiResponses;
use App\Models\Comment;
use App\Models\Post;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\LikeRequest;
use App\Services\Api\Like\LikeService;
use App\Services\Traits\HasAuthHandler;

class LikeController extends Controller
{
    use ApiResponses;

    public function like(LikeRequest $request)
    {
        $result = resolve(LikeService::class)
            ->setRequest($request)
            ->setAuth(Auth::guard('api')->user())
            ->handle();

        return response()->json($result);
        // $checkLike = Like::where('user_id', Auth::guard('api')->user()->id)
        // ->where('object_type', $request->get('object_type'))
        // ->where('object_id', $request->get('object_id'))
        // ->first();
        // $likeList = Like::where('object_type', $request->get('object_type'))
        // ->where('object_id', $request->get('object_id'))->get();
        // $likeCount = count($likeList);
        // if($checkLike) {
        //     $checkLike->delete();
        //     $likeCount--;
        //     $isLiked = false;
        // } else {
        //     $like = new Like;
        //     $like->user_id = Auth::guard('api')->user()->id;
        //     $like->object_type = $request->get('object_type');
        //     $like->object_id = $request->get('object_id');
        //     $like->save();
        //     $likeCount++;
        //     $isLiked = true;
        // }
        // if($request->get('object_type') == config('constants.likes.object_type.post')){
        //     $object = Post::find($request->get('object_id'));
        // } else {
        //     $object = Comment::find($request->get('object_id'));
        // }
        // $object->like_count = $likeCount;
        // $object->save();
        // return $this->successResponse([
        //     'is_liked' => $isLiked,
        //     'like_count' => $likeCount,
        // ]);
    }
}
