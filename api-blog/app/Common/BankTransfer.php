<?php

namespace  App\Common;

use Illuminate\Support\Str;

class BankTransfer
{
    public static function generateBankId()
    {
        return Str::random(48) . time();
    }
}
