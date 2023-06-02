<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Comment;
use App\Models\Traits\CanBeLiked;
use App\Models\User;
use App\Models\Contracts\Likeable;

class Post extends Model implements Likeable
{
    use HasFactory, CanBeLiked;

    protected $fillable = [
        'id',
        'title',
        'content',
        'user_id',
        'like_count',
        'comment_count',
    ];

    public function comments()
    {
        return $this->hasMany(Comment::class);
    }

    public function author()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
