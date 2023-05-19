<?php


namespace App\Http\Responses\Exceptions;

use Ecs\L8Core\Core\BaseResponse;
use Illuminate\Http\Response;

class NotFoundResponse extends BaseResponse
{
    protected $message    = 'not_found';
    protected $errors     = ['message' => 'error.not_found'];
    protected $statusCode = Response::HTTP_NOT_FOUND;
}
