<?php

use Illuminate\Database\Eloquent\Scope;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
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
        Schema::table('users',function(Blueprint $table) {
            $table->timestamp('phone_verified_at')->nullable()->after('phone');
            $table->timestamp('email_verified_at')->nullable()->after('email');
            $table->boolean('is_verified')->default(false)->after('username');
            $table->boolean('sex')->after('name');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('users', function (Blueprint $table){
            $table->dropColumn('phone_verified_at');
            $table->dropColumn('email_verified_at');
            $table->dropColumn('is_verified');
            $table->dropColumn('sex');
        });
    }
};
