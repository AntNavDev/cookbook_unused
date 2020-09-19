@extends('layouts.app')

@section('content')
    <div class="row">
        <div class="col-md-12">
            <a href="{{ route('recipes.single', $recipe) }}">Back to recipe page</a>
        </div>
    </div>
    <div class="row">
        <div class="col-md-6">
            <h2>{{ $recipe->name }}</h2>
            @php
                $add_ingredient_data = [
                    'recipeID' => $recipe->id,
                    'ingredients' => $recipe->ingredients,
                    'formAction' => route('ingredients.store'),
                    'canAlterItems' => auth()->user()->recipes->contains($recipe),
                ];
            @endphp
            {{ csrf_field() }}
            <div id="add-ingredient"
                data="{{ json_encode($add_ingredient_data) }}"></div>
        </div>

        <div class="col-md-6">
            <div class="food-photo">
                <div class="invalid-msg hide">Invalid entry.</div>
                @include('partials.add-image')
            </div>
        </div>
    </div>

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
                var messageData = {
                    message: 'Image Uploaded!',
                    level: 'success'
                };

                document.getElementById('info-message').setAttribute('data', JSON.stringify(messageData));
            }
        });

        @if($recipe->display_image)
            // Create the mock file for our upload pic if it exists:
            var mockFile = { name: "Filename", size: 123 };
            var image_path = "{{ Storage::url($recipe->display_image->image_path) }}";
            // Call the default addedfile event handler
            myDropzone.emit("addedfile", mockFile);
            myDropzone.files.push(mockFile);
            // And optionally show the thumbnail of the file:
            myDropzone.emit("thumbnail", mockFile, image_path);
        @endif

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