<?php

namespace App\Services\Api\Post;

use App\Core\BaseService;
use App\Repositories\PostCategoryRepository;
use App\Repositories\PostRepository;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class StorePostService extends BaseService
{
    protected $collectsData = true;
    private PostRepository $postRepository;
    private PostCategoryRepository $postCategoryRepository;

    public function __construct(
        PostRepository $postRepository,
        PostCategoryRepository $postCategoryRepository,
    ) {
        $this->postRepository = $postRepository;
        $this->postCategoryRepository = $postCategoryRepository;
    }

    /**
     * Logic to handle the data
     */
    public function handle()
    {
        return DB::transaction(function () {
            $postCategories = $this->data->get('categories');

            $postData = $this->handlePostData();
            $post = $this->postRepository->create($postData);

            foreach($postCategories as $postCategory) {
                $this->postCategoryRepository->create([
                    'post_id' => $post['id'],
                    'category_id' => $postCategory['id']
                ]);
            }

            return $post;
        });
    }

    protected function handlePostData()
    {
        $postData = $this->data->toArray();
        $postData['like_count'] = 0;
        $postData['comment_count'] = 0;
        $postData['user_id'] = Auth::guard('api')->user()->id;
        unset($postData['categories']);

        return $postData;
    }
}
