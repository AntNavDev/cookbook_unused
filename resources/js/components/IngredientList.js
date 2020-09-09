import React from 'react';
import ReactDOM from 'react-dom';

class IngredientList extends React.Component {
    constructor(props){
        super(props);
        this.state = { ingredients: this.props.ingredients };
    }

    componentDidMount(){
        console.log("Trigger didMount(update?)");
        this.setState((state, props) => {
            ingredients: props.ingredients
        });
    }

    render(){
        console.log("trigger render");
        const items = this.state.ingredients.map((ingredient) =>
            <li key={ingredient.id}>{ingredient.name} <i class="fas fa-trash float-right"></i></li>
        );
        console.log("Ingredients as items: ", items);
        return (
            <div>
                <h3>Ingredients:</h3>
                <ul>
                    {items}
                </ul>
            </div>
        );
    }
}

class App extends React.Component {
    constructor(props){
        super(props);
        this.state = { data: JSON.parse(this.props.data) };
    }

    componentDidMount(){
        console.log("App has mounted...");
        this.setState((state, props) => {
            data: JSON.parse(props.data)
        });
    }

    render(){
        console.log("App is rendering IngredientList...");
        return (
            <div>
                <IngredientList ingredients={this.state.data.ingredients} />
            </div>
        );
    }
}

var data = document.getElementById('ingredient-list').getAttribute('data');
const element = <App data={data} />;
ReactDOM.render(
    element,
    document.getElementById('ingredient-list')
);