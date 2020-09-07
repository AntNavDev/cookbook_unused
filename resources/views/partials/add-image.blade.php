<div class="photo-cont">
    <div id="image_dropzone">
        <div class="action-image">
            Drag and drop images here!
        </div>
    </div>
    <p>{{ isset($prompt) ? $prompt : '' }}</p>
    <button id="submit-image-btn" class="btn-rounded btn-primary no-border py-1 px-2">Save Image</button>
</div>