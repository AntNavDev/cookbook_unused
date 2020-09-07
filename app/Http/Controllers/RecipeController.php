<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Recipe;

class RecipeController extends Controller
{
    public function myRecipes(Request $request)
    {
        return view('recipes.my-recipes');
    }

    public function show($id)
    {
        $recipe = Recipe::find($id);

        $data = compact('recipe');
        return view('recipes.single', $data);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'description' => 'required',
        ]);

        $inputs = $request->all();

        $recipe = new Recipe([
            'name' => $inputs['name'],
            'description' => $inputs['description']
        ]);

        auth()->user()->recipes()->save($recipe);

        return redirect()->route('recipes.single', $recipe->id);
    }

    public function edit($id)
    {
        $recipe = Recipe::find($id);

        $data = compact('recipe');
        return view('recipes.edit', $data);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'name' => 'required',
            'description' => 'required',
        ]);

        $inputs = $request->all();

        $recipe = Recipe::find($recipe_id);

        $recipe->update($inputs);

        return redirect()->back();
    }
}
