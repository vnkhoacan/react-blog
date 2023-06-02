<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Like extends Model
{
    use HasFactory;

    protected $fillable = [
        'id',
        'user_id',
        'object_id',
        'object_type',
    ];

    public function likeable()
    {
        return $this->morphTo();
    }

    public function scopeFromUser($query, User $user)
    {
        return $query->where('user_id', $user->id);
    }

    public function scopeFromEloquentModel($query, Model $model)
    {
        return $query->where('object_id', $model->id)->where('object_type', $model->getMorphClass());
    }
}
