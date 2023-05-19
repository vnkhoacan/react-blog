<?php

namespace App\Exceptions;

use App\Core\BaseException;

class RepositoryException extends BaseException
{
    public static function invalidMethod()
    {
        return self::code('repository.invalid_method');
    }

    public static function invalidModel()
    {
        return self::code('repository.invalid_model');
    }
}
