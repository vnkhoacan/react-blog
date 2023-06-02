<?php

namespace App\Services\Traits;

use Illuminate\Support\Facades\Auth;

trait HasAuthHandler
{
    /** @var Auth $auth */
    protected $auth = null;

    /**
     * Set event
     *
     * @param $auth
     * @return $this
     */
    public function setAuth($auth)
    {
        $this->auth = $auth;

        return $this;
    }
}