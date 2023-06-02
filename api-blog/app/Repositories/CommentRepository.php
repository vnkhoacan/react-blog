<?php

namespace App\Repositories;

use App\Core\BaseRepository;
use App\Models\Comment;

class CommentRepository extends BaseRepository
{
    /**
     * Get the model of repository
     *
     * @return string
     */
    public function getModel()
    {
        return Comment::class;
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
