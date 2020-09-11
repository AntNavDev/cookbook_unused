<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;
use App\Recipe;

class RecipeController extends Controller
{
    public function myRecipes(Request $request)
    {
        return view('recipes.my-recipes');
    }

    public function show(Recipe $recipe)
    {
        $data = compact('recipe');
        return view('recipes.single', $data);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'description' => 'required',
        ]);

        $recipe = new Recipe([
            'name' => $request->name,
            'description' => $request->description,
            'is_public' => $request->has('is_public') ? $request->is_public : 1,
        ]);

        auth()->user()->recipes()->save($recipe);

        return redirect()->route('recipes.single', [auth()->user(), $recipe->id]);
    }

    public function edit(Recipe $recipe)
    {
        $data = compact('recipe');
        return view('recipes.edit', $data);
    }

    public function update(Request $request, Recipe $recipe)
    {
        $request->validate([
            'name' => 'required',
            'description' => 'required',
        ]);

        $recipe->update($request->all());

        return redirect()->back();
    }
}
