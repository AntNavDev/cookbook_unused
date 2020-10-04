import React from 'react';

class AddStepForm extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            name: '',
            description: '',
            formAction: this.props.formAction,
            recipeID: this.props.recipeID,
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
            description: this.state.description,
        };

        console.log("Submit form!", formData);
    }

    render(){
        return(
            <div>
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <label>
                            Name:
                            <input name="name" type="text" className="form-control" value={this.state.name} onChange={this.handleInputChange} required />
                        </label>
                    </div>

                    <div>
                        <label>
                            Description:
                            <textarea name="description" className="form-control" value={this.state.description} onChange={this.handleInputChange} required></textarea>
                        </label>
                    </div>

                    <input type="submit" value="Submit" />
                </form>
            </div>
        );
    }
}

export default AddStepForm;