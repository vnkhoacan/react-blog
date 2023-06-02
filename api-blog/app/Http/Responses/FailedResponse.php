<?php

namespace App\Http\Responses;

use App\Core\BaseResponse;
use Illuminate\Http\Response;

class FailedResponse extends BaseResponse
{
    protected $message    = 'action.failed';
    protected $statusCode = Response::HTTP_BAD_REQUEST;

    public function __construct(string $message = null, $statusCode = 400)
    {
        $this->message = is_null($message) ?: $message;
        $this->statusCode = $statusCode;
    }
}
