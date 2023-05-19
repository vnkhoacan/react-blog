<?php

namespace  App\Common;

use Illuminate\Support\Facades\App;

class LocaleLang
{
    public static function generateGetLocale()
    {
        return App::getLocale();
    }

    public static function generateSetLocale($lang)
    {
        App::setLocale($lang);
    }
}
