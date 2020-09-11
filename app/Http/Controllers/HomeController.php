<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Recipe;

class HomeController extends Controller
{
    public function index()
    {
        $latest_recipes = Recipe::where('is_public', 1)
                                    ->orderBy('created_at', 'desc')
                                    ->take(5)
                                    ->get();

        // dd($latest_recipes);

        $data = compact('latest_recipes');
        return view('home', $data);
    }
}
