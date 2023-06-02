<?php

namespace App\Services\Traits;

trait BaseOrderBy
{
    public function orderBy()
    {
        $sortOrder = (!empty($this->data['typeSort']) && strtolower($this->data['typeSort']) == 'asc') ? '' : '-';

        return $sortOrder . (isset($this->data['keySort']) && !empty($this->data['keySort']) ? $this->data['keySort'] : 'id');
    }
}