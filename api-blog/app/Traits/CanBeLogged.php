<?php

namespace App\Traits;

use Illuminate\Support\Facades\Log;

trait CanBeLogged
{
    protected $info = '';
    protected $channel = 'batch';

    /**
     * Setup
     *
     * @param string $name
     * @return void
     */
    protected function setupLog(string $name)
    {
        $time = now()->format('Y-m-d H:m:s');
        $this->info = $name . '[' . $time . ']: %s';
    }

    /**
     * Make log on server
     *
     * @param string $message
     * @param bool $isError
     * @return void
     */
    protected function makeLog(string $message, $isError = false)
    {
        if ($isError) {
            Log::channel($this->channel)->error(sprintf($this->info, $message));

            return;
        }

        Log::channel($this->channel)->info(sprintf($this->info, $message));
    }
}
