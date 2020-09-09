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
                $filename = $image->hashName();
                $name = $image->getClientOriginalName();
                $user_image = new Image([
                    'name' => $name,
                    'filename'  => $filename,
                ]);

                $recipe = Recipe::find($recipe_id);
                $imagePath = '';
                if($recipe->display_image)
                {
                    $imagePath = public_path('storage/' . $recipe->display_image->image_path);
                }
                if(\File::exists($imagePath) && $recipe->display_image->delete())
                {
                    unlink($imagePath);
                }
                if($recipe->images()->save($user_image))
                {
                    return response()->json([
                        'success' => true,
                        'image_path' => Storage::url('images/' . $filename),
                    ]);
                }
            }
        }

        return response()->json([
            'success' => false,
        ]);
    }
}
