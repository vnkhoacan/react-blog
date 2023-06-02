<?php

namespace App\Http\Resources\Post;

use Illuminate\Http\Resources\Json\JsonResource;

class ListPostResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        $result = $this->resource->only(
            'id',
            'title',
            'content',
            'like_count',
            'comment_count',
            'created_at',
            'updated_at',
        );

        $result['author'] = optional($this->author)->only('id', 'name', 'avatar');

        return $result;
    }
}
