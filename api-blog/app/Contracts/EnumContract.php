<?php

namespace App\Contracts;

interface EnumContract
{
    /**
     * Get all enum values
     *
     * @return array
     */
    public static function all();
}
