<?php

namespace  App\Common;

class Phone
{
    public static function formatBeforeHandle($phone)
    {
        return '+' . $phone;
    }
}
