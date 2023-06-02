<?php

namespace App\Enums;

enum TypeSort: string
{
    case ASC  = 'ASC';
    case DESC = 'DESC';

    public static function allType()
    : array
    {
        return array_column(TypeSort::cases(), 'value');
    }
}
