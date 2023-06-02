<?php

namespace App\Http\Controllers;

use App\Http\Resources\BaseResource\NoPaginateCollection;
use App\Services\Api\Category\ListCategoryService;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    public function index()
    {
        $result = resolve(ListCategoryService::class)
            ->handle();

        return new NoPaginateCollection($result);
    }
}
