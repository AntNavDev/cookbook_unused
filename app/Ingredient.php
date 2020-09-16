<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Ingredient extends Model
{
    protected $guarded = [];
    protected $appends = ['delete_link', 'weight'];

    public function recipe()
    {
        return $this->belongsTo(Recipe::class);
    }

    public function getDeleteLinkAttribute()
    {
        return route('ingredients.delete', $this);
    }

    public function getWeightAttribute()
    {
        return $this->custom_weight ?: $this->standard_weight;
    }
}
