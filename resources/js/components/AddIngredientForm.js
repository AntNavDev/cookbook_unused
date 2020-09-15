import React from 'react';

class AddIngredientForm extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            name: '',
            amount: '',
            custom_weight: '',
            formAction: this.props.formAction,
            recipeID: this.props.recipeID
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(event){
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleSubmit(event){
        event.preventDefault();
        var csrfToken = document.querySelector('input[name="_token"]').value;
        var formData = {
            _token: csrfToken,
            recipe_id: this.state.recipeID,
            name: this.state.name,
            amount: this.state.amount,
            custom_weight: this.state.custom_weight
        };

        fetch(this.state.formAction, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        })
        .then(response => response.json())
        .then(data => console.log("Fetch Successful:", data));

    }

    render(){
        return (
            <form onSubmit={this.handleSubmit}>
                <div>
                    <label>
                        Name:
                        <input name="name" type="text" value={this.state.name} onChange={this.handleInputChange} required />
                    </label>
                </div>

                <div>
                    <label>
                        Amount:
                        <input name="amount" type="text" value={this.state.amount} onChange={this.handleInputChange} required />
                    </label>
                </div>

                <div>
                    <label>
                        Custom Weight:
                        <input name="custom_weight" type="text" value={this.state.custom_weight} onChange={this.handleInputChange} required />
                    </label>
                </div>

                <input type="submit" value="Submit" />
            </form>
        );
    }
}

export default AddIngredientForm;