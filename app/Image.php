<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Image extends Model
{
    protected $guarded = [];

    public function getImagePathAttribute()
    {
        return 'images/' . $this->filename;
    }

    public function imageable()
    {
        return $this->morphTo();
    }
}
