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
            <li key={ingredient.id}>{ingredient.name}</li>
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

var data = document.getElementById('ingredient-list').getAttribute('data');
const element = <IngredientList ingredients={JSON.parse(data).ingredients} />;
ReactDOM.render(
    element,
    document.getElementById('ingredient-list')
);