<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Recipe;

class HomeController extends Controller
{
    public function index()
    {
        // Get latest recipes and return as an array.
        // Returning as an array allows access to the
        // display image in the react component
        $latest_recipes = Recipe::has('images')
                                    ->where('is_public', 1)
                                    ->orderBy('created_at', 'desc')
                                    ->take(5)
                                    ->get()
                                    ->toArray();

        dd($latest_recipes);
        $data = compact('latest_recipes');
        return view('home', $data);
    }
}
