<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Ingredient extends Model
{
    $guarded = [];

    public function recipe()
    {
        return $this->belongsTo(Recipe::class);
    }
}
