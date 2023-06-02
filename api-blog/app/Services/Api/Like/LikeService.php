<?php

namespace App\Services\Api\Like;

use App\Core\BaseService;
use App\Enums\LikeType;
use App\Enums\ValidFlag;
use App\Exceptions\BusinessException;
use App\Repositories\CommentRepository;
use App\Repositories\LikeRepository;
use App\Repositories\PostRepository;
use App\Services\Traits\HasAuthHandler;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class LikeService extends BaseService
{
    use HasAuthHandler;

    protected $collectsData = true;

    protected LikeRepository $likeRepository;
    protected PostRepository $postRepository;
    protected CommentRepository $commentRepository;

    public function __construct(
        LikeRepository $likeRepository,
        PostRepository $postRepository,
        CommentRepository $commentRepository,
    )
    {
        $this->likeRepository = $likeRepository;
        $this->postRepository = $postRepository;
        $this->commentRepository = $commentRepository;
    }

    /**
     * Logic to handle the data
     */
    public function handle()
    {
        $model = null;

        switch ($this->data->get('type')) {
            case LikeType::POST->value:
                $model = $this->postRepository->firstWhere(['id' => $this->data->get('id')]);
                break;
            case LikeType::COMMENT->value:
                $model = $this->commentRepository->firstWhere(['id' => $this->data->get('id')]);
                break;
        }

        throw_if(!$model, new BusinessException('Khong ton tai', Response::HTTP_NOT_FOUND));

        if ($this->data->get('isLike') == ValidFlag::PUBLIC->value) {
            $this->auth->like($model);
        } else {
            $this->auth->unlike($model);
        }

        return [
            'isLike' => intval($this->data->get('isLike')),
        ];
    }
}
