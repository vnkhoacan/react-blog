<?php

namespace App\Http\Responses;

use Ecs\L8Core\Core\BaseResponse;

class SuccessResponse extends BaseResponse
{
    protected $message    = 'action.succeed';

    public function __construct(string $message = null)
    {
        $this->message = __(is_null($message) ?: $message);
    }
}
