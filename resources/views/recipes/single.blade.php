@extends('layouts.app')

@section('content')
    <div class="row">
        <div class="col-md-4">
            @if(auth()->user() && auth()->user()->recipes->contains($recipe))
                <a href="{{ route('recipes.edit', [$recipe]) }}">Edit {{ $recipe->name }}</a>
            @endif

            <!-- View Ingredient Component -->
            @php
                $ingredient_data = [
                    'ingredients' => $recipe->ingredients,
                    'canAlterItems' => false,
                ];
            @endphp
            <div id="view-ingredient-list"
                data="{{ json_encode($ingredient_data) }}">
            </div>

            <!-- Add Step Component -->
            @php
                $add_step_data = [
                    'steps' => $recipe->steps,
                ];
            @endphp
            <div id="view-step-list"
                data="{{ json_encode($add_step_data) }}">
            </div>
        </div>
        <div class="col-md-8">
            @if($recipe->display_image)
                <img src="{{ Storage::url($recipe->display_image->image_path) }}" class="recipe-main-img" />
            @endif
        </div>
    </div>
@endsection

@push('scripts')

@endpush