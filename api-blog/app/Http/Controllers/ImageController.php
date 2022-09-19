<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Intervention\Image\Facades\Image;

class ImageController extends Controller
{
    public function getImage($avatar)
    {
        $storedPath = public_path('/images/'.$avatar);
        return Image::make($storedPath)->response();
    }
}
