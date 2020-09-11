@extends('layouts.app')

@section('content')

<div>
    <ul>
        @foreach(auth()->user()->recipes as $recipe)
            <li>
                <a href="{{ route('recipes.single', ['recipe' => $recipe]) }}">{{ $recipe->name }}</a>
            </li>
        @endforeach
    </ul>
    <button type="button" data-toggle="modal" data-target="#recipeModal" class="btn add-recipe-btn btn-success">Add Recipe</button>
</div>

@endsection

@section('modals')
    @include('recipes.partials.add-recipe-modal')

@endsection

@push('scripts')
<script>
    document.addEventListener("DOMContentLoaded", function(){
        var form = document.getElementById("add-recipe-form");

        document.getElementById("save-recipe-btn").addEventListener("click", function () {
            form.submit();
        });
    });
</script>
@endpush