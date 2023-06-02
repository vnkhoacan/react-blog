<?php

namespace App\Exceptions;

use App\Traits\JsonAPIResponses;
use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Illuminate\Http\Exceptions\HttpResponseException;
use Throwable;

class Handler extends ExceptionHandler
{
    use JsonAPIResponses;
    /**
     * A list of exception types with their corresponding custom log levels.
     *
     * @var array<class-string<\Throwable>, \Psr\Log\LogLevel::*>
     */
    protected $levels = [
        //
    ];

    /**
     * A list of the exception types that are not reported.
     *
     * @var array<int, class-string<\Throwable>>
     */
    protected $dontReport = [
        //
    ];

    /**
     * A list of the inputs that are never flashed to the session on validation exceptions.
     *
     * @var array<int, string>
     */
    protected $dontFlash = [
        'current_password',
        'password',
        'password_confirmation',
    ];

    /**
     * Register the exception handling callbacks for the application.
     *
     * @return void
     */
    public function register()
    {
        $this->reportable(function (Throwable $e) {
            //
        });
    }

    protected $exceptionMapping = [
        'Symfony\Component\HttpKernel\Exception\NotFoundHttpException' => 'NotFoundResponse',
        'Illuminate\Database\Eloquent\ModelNotFoundException'          => 'NotFoundResponse',

        'Illuminate\Auth\AuthenticationException'                      => 'UnauthenticatedResponse',
        'Laravel\Passport\Exceptions\MissingScopeException'            => 'UnauthenticatedResponse',
        'Illuminate\Validation\ValidationException'                    => 'ValidationResponse',

        'Illuminate\Database\QueryException'                           => 'ErrorExceptionResponse',
        'ErrorException'                                               => 'ErrorExceptionResponse',
        'Error'                                                        => 'ErrorExceptionResponse',
        'Exception'                                                    => 'ErrorExceptionResponse',

        'App\Exceptions\BusinessException'                             => 'BusinessExceptionResponse',
    ];

    public function render($request, Throwable $exception)
    {
        dd($exception);
        if ($this->shouldRenderExceptionToJson($exception)) {
            return $this->renderJsonExceptions($exception);
        }

        return parent::render($request, $exception);
    }

    private function customApiResponse($exception)
    {
        if (method_exists($exception, 'getStatusCode')) {
            $statusCode = $exception->getStatusCode();
        } else {
            $statusCode = 500;
        }

        $response = [];

        switch ($statusCode) {
            case 401:
                $response['message'] = 'Unauthorized';
                break;
            case 403:
                $response['message'] = 'Forbidden';
                break;
            case 404:
                $response['message'] = 'Not Found';
                break;
            case 405:
                $response['message'] = 'Method Not Allowed';
                break;
            case 422:
                $response['message'] = $exception->original['message'];
                $response['errors'] = $exception->original['errors'];
                break;
            default:
                $response['message'] = ($statusCode == 500) ? 'Whoops, looks like something went wrong' : $exception->getMessage();
                break;
        }

        if (config('app.debug')) {
            $response['trace'] = $exception->getTrace();
            $response['code'] = $exception->getCode();
        }

        $response['status'] = $statusCode;

        return response()->json($response, $statusCode);
    }

    private function handleApiException($request, Throwable $exception)
    {
        $exception = $this->prepareException($exception);

        if ($exception instanceof HttpResponseException) {
            $exception = $exception->getResponse();
        }

        if ($exception instanceof \Illuminate\Auth\AuthenticationException) {
            $exception = $this->unauthenticated($request, $exception);
        }

        if ($exception instanceof \Illuminate\Validation\ValidationException) {
            $exception = $this->convertValidationExceptionToResponse($exception, $request);
        }

        dd($exception);

        return $this->customApiResponse($exception);
    }
}