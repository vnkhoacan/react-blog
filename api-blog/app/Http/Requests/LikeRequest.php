<?php

namespace App\Http\Requests;

use App\Enums\LikeType;
use App\Enums\ValidFlag;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class LikeRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'id' => [
                'required',
                'numeric',
            ],
            'isLike' => [
                'required',
                'numeric',
                Rule::in(ValidFlag::allType()), // 0:unlike, 1:like
            ],
            'type' => [
                'required',
                Rule::in(LikeType::allType()),
            ],
        ];
    }
}
