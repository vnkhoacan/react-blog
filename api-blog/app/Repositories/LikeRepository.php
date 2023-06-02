<?php

namespace App\Repositories;

use App\Core\BaseRepository;
use App\Models\Like;

class LikeRepository extends BaseRepository
{
    /**
     * Get the model of repository
     *
     * @return string
     */
    public function getModel()
    {
        return Like::class;
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
