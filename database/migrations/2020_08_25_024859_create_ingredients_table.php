<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateIngredientsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        $measurements = [
            'drop',
            'smidgen',
            'pinch',
            'dash',
            'saltspoon',
            'coffeespoon',
            'fluid dram',
            'teaspoon',
            'dessertspoon',
            'tablespoon',
            'fluid ounce',
            'wineglass',
            'teacup',
            'cup',
            'pint',
            'quart',
            'pottle',
            'gallon',
            'gram',
            'liter'
        ];

        Schema::create('ingredients', function (Blueprint $table) use ($measurements) {
            $table->id();
            $table->string('name');
            $table->double('amount');
            $table->string('custom_weight')->nullable();
            $table->enum('standard_weight', $measurements)->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('ingredients');
    }
}
