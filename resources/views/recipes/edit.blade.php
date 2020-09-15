@extends('layouts.app')

@section('content')
    <div class="row">
        <div class="col-md-12">
            <a href="{{ route('recipes.single', $recipe) }}">Back to recipe page</a>
        </div>
    </div>
    <div class="row">
        <div class="col-md-4">
            <h2>{{ $recipe->name }}</h2>
            <div class="preview-container">
                <img id="display-image" src="{{ $recipe->display_image ? Storage::url($recipe->display_image->image_path) : asset('images/plate-fork-knife.jpg') }}" height="200" width="200" />
            </div>
        </div>

        <div class="col-md-4">
            @php
                $add_ingredient_data = [
                    'recipeID' => $recipe->id,
                    'ingredients' => $recipe->ingredients,
                    'formAction' => route('ingredients.store'),
                ];
            @endphp
            {{ csrf_field() }}
            <div id="add-ingredient"
                data="{{ json_encode($add_ingredient_data) }}"></div>
            <!-- <button type="button" class="btn btn-success" data-toggle="modal" data-target="#addIngredientModal">Add an ingredient</button> -->
        </div>

        <div class="col-md-4">
            <div class="food-photo">
                <div class="invalid-msg hide">Invalid entry.</div>
                @include('partials.add-image')
            </div>
        </div>
    </div>

@endsection

@section('modals')
    @include('ingredients.ingredient-modal', [ 'recipe_id' => $recipe->id ])
@endsection

@push('scripts')
<script>
    document.addEventListener("DOMContentLoaded", function(){
        var myDropzone = new Dropzone('#image_dropzone', {
            addRemoveLinks: true,
            url: "{{ route('images.store') }}",
            autoProcessQueue: false,
            maxFiles: 1,
            maxFilesize: 10,
            acceptedFiles: ".jpeg,.jpg,.png",
            paramName: "photo",
            init: function(){
                this.on('sending', function(file, xhr, formData){
                    formData.append("_token", "{{ csrf_token() }}");
                    formData.append("recipe_id", "{{ $recipe->id }}");
                });

                this.on("maxfilesexceeded", function(file) {
                    this.removeAllFiles();
                    this.addFile(file);
                });
            },
            success: function(file, response){
                if(typeof response.image_path !== 'undefined')
                {
                    this.removeAllFiles();
                    document.getElementById('display-image').setAttribute('src', response.image_path);
                }
            }
        });

        document.getElementById("submit-image-btn").addEventListener("click", function () {
            if (myDropzone.files.length == 0){
                //
            } else if(myDropzone.getRejectedFiles().length > 0) {
                alert("The attached file is invalid");
            } else {
                // Show a modal processing...?
                myDropzone.processQueue();
            }
        });
    });
</script>
@endpush