import React from 'react';
import ReactDOM from 'react-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

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
        let object_id = this.state.id;
        fetch()
        .then()
        .then(function(data){
            console.log("data from fetch", data);
        });
    }

    render(){
        return(
            <li className="list-item">
                {this.state.name} <FontAwesomeIcon icon={faTrash} className="float-right" onClick={this.deleteObject} />
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

if(document.getElementById('ingredient-list')){
    var data = document.getElementById('ingredient-list').getAttribute('data');
    const element = <App data={data} />;
    ReactDOM.render(
        element,
        document.getElementById('ingredient-list')
    );
}