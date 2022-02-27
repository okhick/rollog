<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateShotsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('shots', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('roll_id');
            $table->unsignedBigInteger('lens_id');
            $table->float('aperture');
            $table->string('exposure');
            $table->boolean('flash');
            $table->float('pushpull');
            $table->string('title');
            $table->string('notes')->nullable();
            $table->timestamps();
            $table->softDeletes();

            $table->foreign('roll_id')->references('id')->on('rolls')->onDelete('cascade');
            $table->foreign('lens_id')->references('id')->on('lenses');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('shots');
    }
}
