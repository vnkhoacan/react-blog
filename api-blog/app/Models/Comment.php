<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Post;
use App\Models\Traits\CanBeLiked;
use App\Models\User;
use App\Models\Contracts\Likeable;

class Comment extends Model implements Likeable
{
    use HasFactory, CanBeLiked;
    protected $fillable = [
        'id',
        'content',
        'user_id',
        'post_id',
        'like_count',
        'path',
        'created_at',
    ];

    public function post()
    {
        return $this->belongsTo(Post::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
