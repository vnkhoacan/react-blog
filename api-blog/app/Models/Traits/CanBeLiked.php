<?php

namespace App\Models\Traits;

use App\Models\Like;
use App\Models\User;
use Illuminate\Database\Eloquent\Relations\morphMany;

trait CanBeLiked
{
    /**
     * Get all the model's likes.
     *
     * @return morphMany
     */
    public function likes()
    {
        return $this->morphMany(Like::class, 'likeable', 'object_type', 'object_id');
    }

    /**
     * Get number of likes for the model.
     *
     * @return mixed|null
     */
    public function totalLikes()
    {
        return $this->likes()->count();
    }

    /**
     * Check if the authenticated customer has liked this model.
     *
     * @param Customer $customer
     *
     * @return bool
     */
    public function isLikedBy(User $user)
    {
        //dd($this->likes()->toSql());
        return $this->likes()->fromUser($user)->exists();
    }
}
