import React from 'react';

class AddIngredientForm extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            name: '',
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
        console.log("Submit the form. Name is: ", this.state.name);
    }

    render(){
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    Name:
                    <input name="name" type="text" value={this.state.name} onChange={this.handleInputChange} />
                </label>

                <input type="submit" value="Submit" />
            </form>
        );
    }
}

export default AddIngredientForm;