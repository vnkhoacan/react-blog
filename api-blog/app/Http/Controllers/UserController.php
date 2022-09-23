<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Http\Traits\ApiResponses;

class UserController extends Controller
{
    use ApiResponses;
    public function show($id)
    {
        $user = User::find($id);
        return $this->successResponse($user);
    }
}
