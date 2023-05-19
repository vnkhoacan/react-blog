<?php

namespace  App\Common;

class StringHelper
{
    public static function mb_trim($str)
    {
        $str = preg_replace("/^[\s]+/u", '', $str);

        return preg_replace("/[\s]+$/u", '', $str);
    }

    public static function escapeBeforeSearch($str)
    {
        return str_replace('_', '\_', str_replace('%', '\%', str_replace('\\', '\\\\', $str)));
    }

    public static function randomStr($length = 6)
    {
        $string = "";
        $alpha  = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz@#$%^&*()";

        for ($i = 0; $i < $length; $i++) {
            $string .= $alpha[rand(0, strlen($alpha)-1)];
        }

        return $string;
    }

    public static function randomStrUpper($length = 6)
    {
        $string = "";
        $alpha  = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";

        for ($i = 0; $i < $length; $i++) {
            $string .= $alpha[rand(0, strlen($alpha)-1)];
        }

        return $string;
    }

    public static function randomNumber($length)
    {
        $string = "";
        $alpha  = "0123456789";

        for ($i = 0; $i < $length; $i++) {
            $string .= $alpha[rand(0, strlen($alpha)-1)];
        }

        return $string;
    }

    public static function addZeroStrInteger($data, $length)
    {
        $str = isset($data) && (strlen($data) < $length)
            ? str_pad($data, $length, '0', STR_PAD_LEFT)
            : $data;

        return $str;
    }

    public static function convertKanaFullSize(String $string)
    {
        return strtoupper(mb_convert_kana($string, 'aKVs'));
    }

    public static function cutStringByNumberChar(string $string, int $number)
    {
        return mb_strlen($string) > $number ? mb_substr($string, 0, $number) : $string;
    }
}
