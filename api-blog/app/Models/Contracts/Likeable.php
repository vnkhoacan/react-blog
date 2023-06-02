<?php

namespace App\Models\Contracts;

use App\Models\User;
use Illuminate\Database\Eloquent\Relations\MorphMany;

interface Likeable
{
    /**
     * Get all likes.
     *
     * @return MorphMany
     */
    public function likes();

    /**
     * Allow a model to get the number of likes.
     *
     * @return int
     */
    public function totalLikes();

    /**
     * Check if the given customer has liked this item.
     *
     * @param Customer $customer
     *
     * @return bool
     */
    public function isLikedBy(User $user);
}
