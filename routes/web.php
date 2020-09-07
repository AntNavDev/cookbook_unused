<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('home');
});

Auth::routes();

Route::group(['middleware' => ['auth']], function(){
    // User recipes routes
    Route::get('my-recipes', 'RecipeController@myRecipes')->name('recipes.my-recipes');
    Route::post('recipes-store', 'RecipeController@store')->name('recipes.store');

    // Upload Images
    Route::post('images-store', 'ImageController@store')->name('images.store');
});

// Public recipe routes
Route::get('recipes/{id}', 'RecipeController@show')->name('recipes.single');
Route::get('recipes/{id}/edit', 'RecipeController@edit')->name('recipes.edit');