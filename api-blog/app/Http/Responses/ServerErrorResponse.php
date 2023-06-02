<?php

namespace App\Http\Responses;

use App\Core\BaseResponse;
use Illuminate\Http\Response;

/**
 * Class ServerErrorResponse
 * Use it when server request from the third party
 *
 * @package App\Http\Responses
 */
class ServerErrorResponse extends BaseResponse
{
    protected $message    = 'server.error';
    protected $statusCode = Response::HTTP_INTERNAL_SERVER_ERROR;

    public function __construct(string $message = null)
    {
        if (!is_null($message)) {
            $this->message = $message;
        }
    }
}
