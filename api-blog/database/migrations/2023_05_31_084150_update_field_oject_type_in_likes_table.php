<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        DB::statement("ALTER TABLE `likes` CHANGE `object_type` `object_type` VARCHAR(255) NOT NULL");
        Schema::table('likes', function (Blueprint $table) {
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        DB::statement("ALTER TABLE `likes` CHANGE `object_type` `object_type` INTEGER NOT NULL");
        Schema::table('likes', function (Blueprint $table) {
        });
    }
};
