<?php

namespace App\Enums;

enum ValidFlag: int
{
    case PUBLIC = 1;
    case PRIVATE = 0;

    public static function allType()
    : array
    {
        return array_column(ValidFlag::cases(), 'value');
    }
}
