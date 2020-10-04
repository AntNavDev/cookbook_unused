<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Ingredient;
use App\Recipe;
use Validator;

class IngredientController extends Controller
{
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'amount' => 'required',
            'custom_weight' => 'required_without:standard_weight',
            'standard_weight' => 'required_without:custom_weight',
        ]);

        if($validator->fails())
        {
            return response()->json([
                'success' => false,
                'message' => 'Looks like there are some missing fields!',
                'missing_fields' => $validator->messages(),
            ]);
        }

        if($request->has('recipe_id'))
        {
            $recipe = Recipe::findOrFail($request->recipe_id);

            $ingredient = Ingredient::create($request->all());

            $user = auth()->user();
            if($user && $recipe && $user->recipes->contains($recipe) && $recipe->ingredients()->save($ingredient))
            {
                return response()->json([
                    'success' => true,
                    'message' => 'Ingredient saved!',
                    'ingredients' => $recipe->ingredients->toArray(),
                ]);

            }
        }

        return response()->json([
            'success' => false,
            'message' => 'Something went wrong...'
        ]);
    }

    public function delete(Request $request, Ingredient $ingredient)
    {
        $recipe = $ingredient->recipe;
        $user = auth()->user();
        if($user && $recipe && $user->recipes->contains($recipe) && $ingredient->delete())
        {
            return response()->json([
                'success' => true,
                'ingredients' => $recipe->ingredients,
                'message' => 'Ingredient Deleted!'
            ]);
        }
        return response()->json([
            'success' => false,
            'ingredients' => $recipe->ingredients,
            'message' => 'Something went wrong. Ingredient not deleted.',
        ]);
    }
}
