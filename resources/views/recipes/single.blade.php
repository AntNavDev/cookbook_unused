@extends('layouts.app')

@section('content')
    <div class="row">
        <div class="col-md-4">
            @auth
                @if(in_array($recipe->id, auth()->user()->recipes()->pluck('id')->toArray()))
                    <a href="{{ route('recipes.edit', [$recipe]) }}">Edit {{ $recipe->name }}</a>
                @endif
            @endauth
        </div>
        <div class="col-md-8">
            @if($recipe->display_image)
                <img src="{{ Storage::url($recipe->display_image->image_path) }}" height="200" width="200" />
            @endif
        </div>
    </div>
@endsection

@push('scripts')

@endpush