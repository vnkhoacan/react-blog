<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class InstallProjectCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'project:install';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Install project';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $this->info('Start ------> ');

        $this->call('migrate:fresh', ['--seed' => true]);
        $this->info('Migrated and seeded all data.');

        $this->call('passport:install', ['--force' => true, '--uuids' => true]);
        $this->info('Installed Laravel Passport.');

        $this->info('Completed!');
    }
}
