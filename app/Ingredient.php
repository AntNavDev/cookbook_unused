<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Ingredient extends Model
{
    protected $guarded = [];
    protected $appends = ['delete_link'];

    public function recipe()
    {
        return $this->belongsTo(Recipe::class);
    }

    public function getDeleteLinkAttribute()
    {
        return route('ingredients.delete', $this);
    }
}
