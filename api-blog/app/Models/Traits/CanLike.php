<?php

namespace App\Models\Traits;

use App\Models\Contracts\Likeable;
use App\Models\Like;

trait CanLike
{
    /**
     * Like the given model.
     *
     * @param Likeable $model
     *
     * @return void
     */
    public function like(Likeable $model)
    {
        if (!$model->isLikedBy($this)) {
            $model->likes()->save(new Like(['user_id' => $this->id]));
            $model->increment('like_count');
        }
    }

    /**
     * Removes the given eloquent model from the customer's likes.
     *
     * @param Likeable $model
     *
     * @return $this
     */
    public function unlike(Likeable $model)
    {
        if ($model->isLikedBy($this)) {
            Like::fromEloquentModel($model)->fromUser($this)->delete();
            $model->decrement('like_count');
        }
    }
}
