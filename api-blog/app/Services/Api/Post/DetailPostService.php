<?php

namespace App\Services\Api\Post;

use App\Core\BaseService;
use App\Exceptions\BusinessException;
use App\Repositories\PostRepository;
use Illuminate\Http\Response;

class DetailPostService extends BaseService
{
    protected $collectsData = true;
    private PostRepository $postRepository;

    public function __construct(PostRepository $postRepository)
    {
        $this->postRepository = $postRepository;
    }

    /**
     * Logic to handle the data
     */
    public function handle()
    {
        $post = $this->postRepository->firstWhere(['id' => $this->model]);

        throw_if(!$post, new BusinessException('Bai viet khong ton tai', Response::HTTP_NOT_FOUND));

        return $post;
    }
}
