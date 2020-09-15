import React from 'react';
import ReactDOM from 'react-dom';
import IngredientList from './IngredientList';
import AddIngredientForm from './AddIngredientForm';

class AddIngredient extends React.Component {
    constructor(props){
        super(props);
        this.state = { ingredients: this.props.ingredients };
    }

    render(){
        return(
            <div>
                <IngredientList ingredients={this.state.ingredients} />
                <AddIngredientForm />
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
            <AddIngredient ingredients={this.state.data.ingredients} />
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