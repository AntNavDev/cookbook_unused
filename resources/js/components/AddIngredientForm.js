import React from 'react';

class AddIngredientForm extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            name: '',
            amount: '',
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
        console.log("The amount is:", this.state.amount);
    }

    render(){
        return (
            <form onSubmit={this.handleSubmit}>
                <div>
                    <label>
                        Name:
                        <input name="name" type="text" value={this.state.name} onChange={this.handleInputChange} />
                    </label>
                </div>

                <div>
                    <label>
                        Amount:
                        <input name="amount" type="text" value={this.state.amount} onChange={this.handleInputChange} />
                    </label>
                </div>

                <input type="submit" value="Submit" />
            </form>
        );
    }
}

export default AddIngredientForm;