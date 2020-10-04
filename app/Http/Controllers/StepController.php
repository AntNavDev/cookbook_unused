<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Step;
use App\Recipe;
use Validator;

class StepController extends Controller
{
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'description' => 'required',
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

            $step = Step::create($request->all() + ['ordinal' => $recipe->steps->count() + 1]);

            $user = auth()->user();
            if($user && $recipe && $user->recipes->contains($recipe) && $recipe->steps()->save($step))
            {
                $recipe->refresh();
                return response()->json([
                    'success' => true,
                    'message' => 'Step added!',
                    'steps' => $recipe->steps->toArray(),
                ]);

            }
        }

        return response()->json([
            'success' => false,
            'message' => 'Something went wrong...'
        ]);
    }
}
