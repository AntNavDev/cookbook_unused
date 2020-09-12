<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Recipe extends Model
{
    protected $guarded = [];
    protected $appends = ['display_image'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function getDisplayImageAttribute()
    {
        return $this->images->first();
    }

    public function images()
    {
        return $this->morphMany(Image::class, 'imageable');
    }

    public function ingredients()
    {
        return $this->hasMany(Ingredient::class);
    }
}
