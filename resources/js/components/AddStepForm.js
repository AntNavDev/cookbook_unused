import React from 'react';
import { messageContainer } from './../globals.js';

class AddStepForm extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            name: '',
            description: '',
            formAction: this.props.formAction,
            recipeID: this.props.recipeID,
            errors: '',
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.updateSteps = this.props.updateSteps.bind(this);
        this.showView = this.props.showView.bind(this);
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
            description: this.state.description,
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
                this.updateSteps(data.steps)
                this.showView('StepList');
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
        return(
            <div>
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
                            Description:
                            <textarea name="description" className={typeof this.state.errors['description'] !== 'undefined' ? ('form-control input-error') : ('form-control')} value={this.state.description} onChange={this.handleInputChange} required></textarea>
                            {typeof this.state.errors['description'] !== 'undefined' ? (<span className="red-text">{this.state.errors['description'][0]}</span>) : ('')}
                        </label>
                    </div>

                    <input type="submit" value="Submit" />
                </form>
            </div>
        );
    }
}

export default AddStepForm;