<?php

namespace App\Http\Resources\BaseResource;

use Illuminate\Http\Resources\Json\ResourceCollection;

class NoPaginateCollection extends ResourceCollection
{
    /**
     * Transform the resource collection into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return parent::toArray($request);
    }
}
