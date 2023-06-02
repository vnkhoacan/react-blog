<?php

namespace App\Http\Requests;

use App\Enums\TypeSort;
use App\Enums\ValidFlag;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class BaseRequest extends FormRequest
{
    /**
     * Common list rules
     *
     * @return array
     */
    public function commonListRules()
    : array
    {
        return [
            'noPaginate' => [
                'bail',
                'sometimes',
                Rule::in(ValidFlag::allType()),
            ],
            'page'       => [
                'bail',
                'sometimes',
                'integer',
            ],
            'keySort'    => [
                'bail',
                'sometimes',
                'string',
            ],
            'typeSort'   => [
                'bail',
                'sometimes',
                'string',
                Rule::in(TypeSort::allType()),
            ],
        ];
    }

    protected function telephoneRules()
    {
        return ['regex:/^0\d{9,10}$/'];
    }
}