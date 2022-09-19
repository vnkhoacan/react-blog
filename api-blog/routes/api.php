<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\ImageController;
use App\Http\Controllers\LikeController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Authentication API with Passport
Route::group([
    'prefix' => 'auth'
], function () {
    Route::post('login', [AuthController::class, 'login']);
    Route::post('register', [AuthController::class, 'register']);
    Route::group([
        'middleware' => 'auth:api'
    ], function() {
        Route::delete('logout', [AuthController::class, 'logout']);
        Route::get('user', [AuthController::class, 'user']);
    });
});
Route::group([
    'middleware' => 'auth:api'
], function() {
    Route::get('posts/my-post', [PostController::class, 'myPosts']);
    Route::resource('posts', PostController::class)->only([
        'store','destroy'
    ]);
});
Route::resource('posts', PostController::class)->only([
    'index', 'show'
]);
Route::get('image/{avatar}', [ImageController::class, 'getImage']);
Route::post('like', [LikeController::class, 'like']);

