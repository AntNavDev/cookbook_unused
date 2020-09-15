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
            recipeID: this.props.data.recipeID
        };

        this.updateIngredients = this.updateIngredients.bind(this);
    }

    updateIngredients(ingredients){
        this.setState({
            ingredients: ingredients
        });
    }

    render(){
        return(
            <div>
                <IngredientList
                    ingredients={this.state.ingredients}
                    updateIngredients={this.updateIngredients} />
                <AddIngredientForm
                    formAction={this.state.formAction}
                    recipeID={this.state.recipeID}
                    ingredients={this.state.ingredients}
                    updateIngredients={this.updateIngredients} />
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