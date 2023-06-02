<?php

namespace App\Repositories;

use App\Core\BaseRepository;
use App\Models\Post;

class PostRepository extends BaseRepository
{
    /**
     * Get the model of repository
     *
     * @return string
     */
    public function getModel()
    {
        return Post::class;
    }

    /**
     * Register relations
     */
    public function allowRelations()
    {
        return [
            //
        ];
    }

    /**
     * OrderBy follow fields
     */
    public function getOrderableFields()
    {
        return [
            'created_at',
            'id',
        ];
    }
}
