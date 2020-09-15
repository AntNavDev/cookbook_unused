<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Ingredient;
use App\Recipe;

class IngredientController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'amount' => 'required',
            'custom_weight' => 'required_without:standard_weight',
            'standard_weight' => 'required_without:custom_weight',
        ]);

        if($request->has('recipe_id'))
        {
            $recipe = Recipe::findOrFail($request->recipe_id);

            $ingredient = Ingredient::create($request->all());

            $recipe->ingredients()->save($ingredient);

            return response()->json([
                'success' => true,
                'message' => 'Ingredient saved!',
                'ingredients' => $recipe->ingredients->toArray(),
            ]);
        }

        return response()->json([
            'success' => false,
            'message' => 'Something went wrong...'
        ]);
    }

    public function delete(Request $request, Ingredient $ingredient)
    {
        $recipe = $ingredient->recipe;
        if($recipe && $ingredient->delete())
        {
            return response()->json([
                'success' => true,
                'ingredients' => $recipe->ingredients,
            ]);
        }
        return response()->json([
            'success' => false,
        ]);
    }
}
