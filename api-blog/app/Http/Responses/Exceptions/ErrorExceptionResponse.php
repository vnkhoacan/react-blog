<?php

namespace App\Http\Responses\Exceptions;

use App\Http\Responses\ServerErrorResponse;
use Illuminate\Database\QueryException;
use Throwable;

class ErrorExceptionResponse extends ServerErrorResponse
{
    /**
     * ErrorExceptionResponse constructor.
     * @param Throwable $e
     */
    public function __construct(Throwable $e)
    {
        parent::__construct();

        $message = $e->getMessage();

        // DB disconnected
        if ($e instanceof QueryException && $e->getCode() == 2002) {
            $message = __('messages.database_disconnect');
        }

        $this->errors = !app()->environment('local')
            ? [
                'message' => 'error.server.unexpected'
            ] : [
                'message' => $message,
                'file'    => $e->getFile(),
                'line'    => $e->getLine(),
            ];
    }
}
