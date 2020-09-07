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
    <!-- Modal -->
    <div class="modal fade" id="addIngredientModal" tabindex="-1" role="dialog" aria-labelledby="addIngredientModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="addIngredientModalLabel">Add Ingredient</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <label for="name">Name</label>
                    <input type="text" name="name" class="form-control" />
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary">Save Ingredient</button>
                </div>
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
            acceptedFiles: ".jpeg,.jpg,.png",
            paramName: "photo",
            init: function(){
                this.on('sending', function(file, xhr, formData){
                    formData.append("_token", "{{ csrf_token() }}");
                    formData.append("recipe_id", "{{ $recipe->id }}");
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