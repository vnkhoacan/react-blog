<?php

namespace App\Providers;

use App\Enums\MorphRelation;
use App\Models\Comment;
use App\Models\Post;
use Illuminate\Database\Eloquent\Relations\Relation;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        $this->bootMorphRelations();
    }

    protected function bootMorphRelations()
    {
        Relation::morphMap(
            [
                MorphRelation::POST->value      => Post::class,
                MorphRelation::COMMENT->value   => Comment::class,
            ]
        );
    }
}
