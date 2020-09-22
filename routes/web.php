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

Route::get('/', 'HomeController@index');

Auth::routes();

Route::group(['middleware' => ['auth']], function(){

    // User recipes routes
    Route::get('my-recipes', 'RecipeController@myRecipes')->name('recipes.my-recipes');
    Route::post('recipes/store', 'RecipeController@store')->name('recipes.store');
    Route::get('recipes/{recipe}/edit', 'RecipeController@edit')->name('recipes.edit');

    // Upload Images
    Route::post('images/store', 'ImageController@store')->name('images.store');
    Route::delete('images/{image}', 'ImageController@destroy')->name('images.destroy');

    // Ingredient Routes
    Route::post('ingredient/store', 'IngredientController@store')->name('ingredients.store');
    Route::delete('ingredient/{ingredient}', 'IngredientController@delete')->name('ingredients.delete');
});


// Public recipe routes
Route::get('recipes/{recipe}', 'RecipeController@show')->name('recipes.single');
