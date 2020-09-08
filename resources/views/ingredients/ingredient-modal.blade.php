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
                <form action="{{ route('ingredients.store') }}" method="POST" id="add-ingredient-form">
                    <input type="hidden" name="recipe_id" value="{{ $recipe_id }}" />
                    {{ csrf_field() }}
                    <label for="name">Name</label>
                    <input type="text" name="name" class="form-control" id="name" />
                    <label for="amount">Amount</label>
                    <input type="text" name="amount" class="form-control" id="amount" />
                    <label for="custom_weight">Custom Weight</label>
                    <input type="text" name="custom_weight" class="form-control" id="custom_weight" />
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal" id="close-ingredient-modal">Close</button>
                <button type="button" class="btn btn-primary" id="save-ingredient-button">Save Ingredient</button>
            </div>
        </div>
    </div>
</div>

@push('scripts')
<script>
    document.getElementById('save-ingredient-button').addEventListener('click', function(){
        var form = document.getElementById('add-ingredient-form');

        fetch('{{ route("ingredients.store") }}', {
            method: 'POST',
            body: new FormData(form)
        })
        .then(response => response.json())
        .then((data) => {
            console.log(data);
            document.getElementById('ingredient-list').setAttribute('data', JSON.stringify(data.ingredients));
            document.getElementById('close-ingredient-modal').click();
        });
    });
</script>
@endpush
