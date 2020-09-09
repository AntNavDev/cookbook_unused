@extends('layouts.app')

@section('content')
    <div class="row">
        <div class="col-md-12">
            <a href="{{ URL::previous() }}">Back to recipe page</a>
        </div>
    </div>
    <div class="row">
        <div class="col-md-4">
            <h2>{{ $recipe->name }}</h2>
            <div class="preview-container">
                @foreach($recipe->images as $image)
                    <img src="{{ Storage::url($image->url) }}" height="200" width="200" />
                @endforeach
            </div>
        </div>

        <div class="col-md-4">

            <div id="ingredient-list" data="{{ json_encode([ 'ingredients' => $recipe->ingredients ]) }}"></div>
            <button type="button" class="btn btn-success" data-toggle="modal" data-target="#addIngredientModal">Add an ingredient</button>
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
                console.log(response);
            }
        });

        document.getElementById("submit-image-btn").addEventListener("click", function () {
            if (myDropzone.files.length == 0){
                // $('').removeClass('hide');
                console.log("Hide Something?");
            } else if(myDropzone.getRejectedFiles().length > 0) {
                alert("The attached file is invalid");
            } else {
                // $('#waitingModal').modal('show');
                // Show a modal...
                myDropzone.processQueue();
            }
        });
    });
</script>
@endpush