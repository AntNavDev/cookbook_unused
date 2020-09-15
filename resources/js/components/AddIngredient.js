import React from 'react';
import ReactDOM from 'react-dom';
import IngredientList from './IngredientList';
import AddIngredientForm from './AddIngredientForm';

class AddIngredient extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            ingredients: this.props.data.ingredients,
            formAction: this.props.data.formAction,
            recipeID: this.props.data.recipeID,
            showForm: false
        };

        this.updateIngredients = this.updateIngredients.bind(this);
        this.toggleShowForm = this.toggleShowForm.bind(this);
    }

    updateIngredients(ingredients){
        this.setState({
            ingredients: ingredients
        });
    }

    toggleShowForm(){
        this.setState((state, props) => ({
            showForm: !state.showForm
        }));
    }

    render(){
        var formElement = <button onClick={this.toggleShowForm}>Add Ingredient</button>;
        if(this.state.showForm){
            formElement = <AddIngredientForm
                                    formAction={this.state.formAction}
                                    recipeID={this.state.recipeID}
                                    ingredients={this.state.ingredients}
                                    updateIngredients={this.updateIngredients}
                                    toggleShowForm={this.toggleShowForm} />
        }
        return(
            <div className="row">
                <div className="col-md-6">
                    {formElement}
                </div>
                <div className="col-md-6">
                    <IngredientList
                        ingredients={this.state.ingredients}
                        updateIngredients={this.updateIngredients} />
                </div>
            </div>
        );
    }
}

class App extends React.Component {
    constructor(props){
        super(props);
        this.state = { data: JSON.parse(this.props.data) };
    }

    render(){
        return(
            <AddIngredient data={this.state.data} />
        );
    }
}

if(document.getElementById('add-ingredient')){
    var data = document.getElementById('add-ingredient').getAttribute('data');
    const element = <App data={data} />;
    ReactDOM.render(
        element,
        document.getElementById('add-ingredient')
    );
}