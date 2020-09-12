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
        // various properties needed for our React components
        $latest_recipes = Recipe::has('images')
                                ->where('is_public', 1)
                                ->orderBy('created_at', 'desc')
                                // ->take(5)
                                ->get()
                                ->toArray();

        $data = compact('latest_recipes');
        return view('home', $data);
    }
}
