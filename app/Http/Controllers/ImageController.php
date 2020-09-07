<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use App\Image;
use App\Recipe;

class ImageController extends Controller
{
    public function store(Request $request)
    {
        if($request->has('photo') && $request->has('recipe_id'))
        {
            $image = $request->file('photo');
            $recipe_id = $request->recipe_id;

            if($image->isValid() && $image->store('public/images'))
            {
                $url = 'images/' . $image->hashName();
                $name = $image->getClientOriginalName();
                $user_image = new Image([
                    'name' => $name,
                    'url'  => $url,
                ]);

                $recipe = Recipe::find($recipe_id);
                if($recipe->images()->save($user_image))
                {
                    return response()->json([
                        'success' => true,
                        'image_path' => Storage::url($url),
                    ]);
                }
            }
        }

        return response()->json([
            'success' => false,
        ]);
    }
}
