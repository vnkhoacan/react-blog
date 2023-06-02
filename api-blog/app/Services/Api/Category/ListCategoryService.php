<?php

namespace App\Services\Api\Category;

use App\Core\BaseService;
use App\Repositories\CategoryRepository;

class ListCategoryService extends BaseService
{
    protected $collectsData = true;
    private CategoryRepository $categoryRepository;

    public function __construct(CategoryRepository $categoryRepository)
    {
        $this->categoryRepository = $categoryRepository;
    }

    /**
     * Logic to handle the data
     */
    public function handle()
    {
        return $this->categoryRepository->all();
    }
}
