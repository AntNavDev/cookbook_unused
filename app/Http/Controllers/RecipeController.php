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

    public function show(User $user, Recipe $recipe)
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

        $inputs = $request->all();

        $recipe = new Recipe([
            'name' => $inputs['name'],
            'description' => $inputs['description']
        ]);

        auth()->user()->recipes()->save($recipe);

        return redirect()->route('recipes.single', [auth()->user(), $recipe->id]);
    }

    public function edit(User $user, Recipe $recipe)
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
