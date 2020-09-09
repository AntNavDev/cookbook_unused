import React from 'react';
import ReactDOM from 'react-dom';

class ListItem extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            id: this.props.id,
            name: this.props.name
        };

        this.deleteObject = this.deleteObject.bind(this);
    }

    deleteObject(){
        console.log("Delete the resource.");
    }

    render(){
        return(
            <li className="list-item">
                {this.state.name} <span className="float-right" onClick={this.deleteObject}>X</span>
            </li>
        );
    }
}

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
            <ListItem key={ingredient.id} id={ingredient.id} name={ingredient.name} />
        );
        console.log("Ingredients as items: ", items);
        return (
            <div>
                <h3>Ingredients:</h3>
                <ul className="ingredient-list">
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