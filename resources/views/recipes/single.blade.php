@extends('layouts.app')

@section('content')
    <div class="row">
        <div class="col-md-4">
            <a href="{{ route('recipes.edit', [auth()->user(), $recipe]) }}">Edit {{ $recipe->name }}</a>
        </div>
        <div class="col-md-8">
            <img src="{{ Storage::url($recipe->display_image->image_path) }}" height="200" width="200" />
        </div>
    </div>
@endsection

@push('scripts')

@endpush