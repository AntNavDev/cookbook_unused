import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { messageContainer } from './../globals.js';

class AddIngredientForm extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            name: '',
            amount: '',
            custom_weight: '',
            formAction: this.props.formAction,
            recipeID: this.props.recipeID,
            errors: '',
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.updateIngredients = this.props.updateIngredients.bind(this);
        this.toggleShowForm = this.props.toggleShowForm.bind(this);
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
        .then((data) => {

            var messageData = {
                message: data.message
            };

            if(data.success){
                messageData.level = 'success';

                this.updateIngredients(data.ingredients)
                this.toggleShowForm();
            }
            else{
                messageData.level = 'error';
                if(typeof data.missing_fields !== 'undefined'){
                    this.setState({
                        errors: data.missing_fields
                    });
                }
            }

            messageContainer.setAttribute('data', JSON.stringify(messageData));
        });

    }

    render(){
        return (
            <div className="d-inline-flex">
                <FontAwesomeIcon className="mx-2 mt-1" icon={faTimes} onClick={this.toggleShowForm} />
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <label>
                            Name:
                            <input name="name" type="text" className={typeof this.state.errors['name'] !== 'undefined' ? ('form-control input-error') : ('form-control')} value={this.state.name} onChange={this.handleInputChange} required />
                            {typeof this.state.errors['name'] !== 'undefined' ? (<span className="red-text">{this.state.errors['name'][0]}</span>) : ('')}
                        </label>
                    </div>

                    <div>
                        <label>
                            Amount:
                            <input name="amount" type="text" className={typeof this.state.errors['amount'] !== 'undefined' ? ('form-control input-error') : ('form-control')} value={this.state.amount} onChange={this.handleInputChange} required />
                            {typeof this.state.errors['amount'] !== 'undefined' ? (<span className="red-text">{this.state.errors['amount'][0]}</span>) : ('')}
                        </label>
                    </div>

                    <div>
                        <label>
                            Custom Weight:
                            <input name="custom_weight" type="text" className={typeof this.state.errors['custom_weight'] !== 'undefined' ? ('form-control input-error') : ('form-control')} value={this.state.custom_weight} onChange={this.handleInputChange} required />
                            {typeof this.state.errors['custom_weight'] !== 'undefined' ? (<span className="red-text">{this.state.errors['custom_weight'][0]}</span>) : ('')}
                        </label>
                    </div>

                    <input type="submit" value="Submit" />
                </form>
            </div>
        );
    }
}

export default AddIngredientForm;