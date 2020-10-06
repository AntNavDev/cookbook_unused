import React from 'react';
import ReactDOM from 'react-dom';
import IngredientList from './IngredientList';

class ViewIngredientList extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            ingredients: this.props.data.ingredients,
        };
    }

    render(){
        return(
            <div>
                <IngredientList
                    ingredients={this.state.ingredients} />
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
            <ViewIngredientList
                data={this.state.data} />
        );
    }
}

if(document.getElementById('view-ingredient-list')){
    var data = document.getElementById('view-ingredient-list').getAttribute('data');
    const element = <App data={data} />
    ReactDOM.render(
        element,
        document.getElementById('view-ingredient-list')
    );
}