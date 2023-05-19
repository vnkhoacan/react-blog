<?php

namespace App\Http\Responses\Exceptions;

use Ecs\L8Core\Core\BaseResponse;
use Illuminate\Http\Response;
use Throwable;

class ValidationResponse extends BaseResponse
{
    /**
     * ErrorExceptionResponse constructor.
     * @param Throwable $e
     */
    public function __construct(Throwable $e)
    {
        $this->message    = __('validation.message');
        $this->statusCode = Response::HTTP_UNPROCESSABLE_ENTITY;

        collect($e->errors())->each(function ($val, $key) {
            $this->errors[] = [
                'name'    => $key,
                'message' => $val[0]
            ];
        });
    }
}
