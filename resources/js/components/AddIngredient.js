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
    }

    render(){
        return(
            <div>
                <IngredientList ingredients={this.state.ingredients} />
                <AddIngredientForm formAction={this.state.formAction} recipeID={this.state.recipeID} />
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