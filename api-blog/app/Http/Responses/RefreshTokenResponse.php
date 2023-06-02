<?php

namespace App\Http\Responses;

use App\Core\BaseResponse;
use Illuminate\Contracts\Auth\Authenticatable;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class RefreshTokenResponse extends BaseResponse
{
    /** @var Authenticatable */
    protected $user;

    /**
     * AuthResponse constructor.
     *
     * @param  Authenticatable  $user
     */
    public function __construct(Authenticatable $user)
    {
        $this->user = $user;
    }

    /**
     * The authentication response.
     *
     * @param  Request  $request
     * @return JsonResponse
     */
    public function toResponse($request)
    {
        return response()->json([
            ''
        ]);
    }
}
