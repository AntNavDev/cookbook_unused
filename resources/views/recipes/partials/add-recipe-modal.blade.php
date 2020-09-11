<!-- Add Modal -->
<div class="modal fade" id="recipeModal" tabindex="-1" role="dialog" aria-labelledby="recipeModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="recipeModalLabel">Add a Recipe!</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <form id="add-recipe-form" action="{{ route('recipes.store') }}" method="post">
                    {{ csrf_field() }}
                    <div>
                        <label class="d-inline-block">Recipe Name</label>
                        <div class="d-inline-block float-right">
                            <input type="checkbox" name="is_public" checked value="1" />
                            <label>Make this recipe public?</label>
                        </div>
                        <input type="text" class="form-control" name="name" placeholder="Recipe Name..." required />
                    </div>
                    <div>
                        <label class="my-2">Recipe Description</label><i class="fas fa-question-circle ml-1" title="Add something short like 'Basic tomato soup with crushed heirloom tomatoes'"></i>
                        <textarea class="form-control" name="description" placeholder="Add a description..." required></textarea>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                <button id="save-recipe-btn" type="button" class="btn btn-primary">Save Recipe</button>
            </div>
        </div>
    </div>
</div>