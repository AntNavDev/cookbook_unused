@extends('layouts.app')

@section('content')
    <div class="row">
        <div class="col-md-4">
            <a href="{{ route('recipes.edit', $recipe) }}">Edit {{ $recipe->name }}</a>
        </div>
        <div class="col-md-8">
            @foreach($recipe->images as $image)
                <img src="{{ Storage::url($image->url) }}" height="200" width="200" />
            @endforeach
        </div>
    </div>
@endsection

@push('scripts')

@endpush