<?php

namespace App\Http\Resources\BaseResource;

use Illuminate\Http\Resources\Json\JsonResource;

class NoPaginateResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        $result = $this->resource->only([
            'id',
            'name',
        ]);

        $result['name'] = $this->resource->name ?: ($this->resource->fullName ?: null);

        return $result;
    }
}
