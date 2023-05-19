<?php

namespace App\Http\Middleware;

use App\Http\Responses\Exceptions\UnauthenticatedResponse;
use Carbon\Carbon;
use Closure;
use Illuminate\Http\Request;

class CheckTokenExpired
{
    /**
     * Handle an incoming request.
     *
     * @param Request $request
     * @param Closure $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {
        $isExpired = Carbon::now()->greaterThan($request->user()->token()->expires_at);

        if ($isExpired) {
            $request->user()->token()->revoke();
            return new UnauthenticatedResponse();
        }

        return $next($request);
    }
}
