<?php

namespace App\Http\Responses\Exceptions;

use App\Core\BaseResponse;
use Illuminate\Http\Response;

class UnauthenticatedResponse extends BaseResponse
{
    protected $message;
    protected $errors     = ['message' => 'error.unauthenticated'];
    protected $statusCode = Response::HTTP_UNAUTHORIZED;

    public function __construct()
    {
        $keyMess = request()->hasHeader('authorization') ? 'wrong_token' : 'miss_token';

        $this->message = __('auth.unauthenticated.' . $keyMess);
        $this->errors = ['message' => $this->message];
    }
}
