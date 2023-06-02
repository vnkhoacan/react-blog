<?php

namespace App\Enums;

enum LikeType : string
{
    case POST = 'post';
    case COMMENT = 'comment';

    public static function allType()
    : array
    {
        return array_column(LikeType::cases(), 'value');
    }
}
