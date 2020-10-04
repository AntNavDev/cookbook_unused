<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class StepController extends Controller
{
    public function store(Request $request)
    {
        // Store here...
        dd($request->all());
    }
}
