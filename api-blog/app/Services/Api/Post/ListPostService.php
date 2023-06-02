<?php

namespace App\Services\Api\Post;

use App\Core\BaseService;
use App\Criteria\FilterCriteria;
use App\Criteria\OrderCriteria;
use App\Criteria\WithRelationsCriteria;
use App\Repositories\PostRepository;
use App\Enums\ValidFlag;
use App\Services\Traits\BaseOrderBy;

class ListPostService extends BaseService
{
    use BaseOrderBy;

    protected $collectsData = true;
    protected PostRepository $postRepository;

    public function __construct(PostRepository $postRepository)
    {
        $this->postRepository = $postRepository;
    }

    /**
     * Logic to handle the data
     */
    public function handle()
    {
        $limit = $this->data->get('noPaginate') == ValidFlag::PUBLIC->value ? null : $this->getPerPage();

        $this->postRepository->pushCriteria(
            new FilterCriteria(
                $this->data->toArray(),
                $this->allowFilters(),
            ))->pushCriteria(
            new WithRelationsCriteria(
                $this->data->get('with'),
                $this->postRepository->allowRelations()
            ))->pushCriteria(
            new OrderCriteria([$this->data->get('order', $this->orderBy()), '-created_at']),
            )->with(['author']);

            return $this->postRepository->all();

            if (!$limit) {
                
            }

            return $this->postRepository->paginate($limit);
    }

    private function allowFilters()
    {
        return [
        ];
    }
}
