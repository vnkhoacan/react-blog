<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Like;
use App\Http\Traits\ApiResponses;

class LikeController extends Controller
{
    use ApiResponses;
    public function like(Request $request)
    {
        $like = new Like;
        $like->user_id = $request->get('user_id');
        $like->object_id = $request->get('object_id');
        $like->object_type = $request->get('object_type');
        $like->save();
        return $this->successResponse([]);
    }
}
