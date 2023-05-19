<?php

namespace App\Contracts;

use App\Contracts\RepositoryInterface;

interface CriteriaInterface
{
    /**
     * Apply the criteria
     *
     * @param \Illuminate\Database\Eloquent\Model $model
     * @param \Ecs\L8Core\Contracts\RepositoryInterface $repository
     * @return void
     */
    public function apply($model, RepositoryInterface $repository);
}
