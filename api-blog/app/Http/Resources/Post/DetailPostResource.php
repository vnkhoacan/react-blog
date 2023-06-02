<?php

namespace App\Http\Resources\Post;

use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Auth;

class DetailPostResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        $result = $this->resource->only([
            'id',
            'title',
            'content',
            'like_count',
            'comment_count',
            'created_at',
            'updated_at',
        ]);

        $result['author'] = optional($this->resource->author)->only('id', 'name', 'email', 'avatar');
        $result['comments'] = [];

        $comments = optional($this->resource->comments);

        if ($comments->isNotEmpty()) {
            $result['comments'] = $comments->map(function ($comment) use ($request) {
                $commentData = [
                    'id' => $comment->id,
                    'content' => $comment->content,
                    'path' => $comment->path,
                    'created_at' => $comment->created_at,
                    'like_count' => $comment->like_count,
                ];

                if ($request->hasHeader('Authorization') && Auth::guard('api')->user()) {
                    $user = Auth::guard('api')->user();
                    $commentData['isLike'] = $comment->isLikedBy($user);
                }

                return $commentData;
            });
        }

        if ($request->hasHeader('Authorization') && Auth::guard('api')->user()) {
            $user = Auth::guard('api')->user();
            $result['isLike'] = $this->resource->isLikedBy($user);
        }

        return $result;
    } 
}
