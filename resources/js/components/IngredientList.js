import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

class ListItem extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            ingredient: this.props.ingredient,
        };

        this.deleteObject = this.deleteObject.bind(this);
        this.updateList = this.props.updateList.bind(this);
    }

    deleteObject(){
        var csrfToken = document.querySelector('input[name="_token"]').value;
        var data = {
            _token: csrfToken
        };

        fetch(this.state.ingredient.delete_link, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then((data) => {
            console.log("data from fetch", data);
            this.updateList(data.ingredients);
        });
    }

    render(){
        return(
            <li className="list-item">
                <div className="row">
                    <div className="col-md-4">
                        {this.state.ingredient.amount} {this.state.ingredient.weight}
                    </div>
                    <div className="col-md-4">
                        {this.state.ingredient.name}
                    </div>
                    <div className="col-md-4">
                        <FontAwesomeIcon icon={faTrash} className="float-right" onClick={this.deleteObject} />
                    </div>
                </div>
            </li>
        );
    }
}

class IngredientList extends React.Component {
    constructor(props){
        super(props);
        this.state = { ingredients: this.props.ingredients };

        this.updateList = this.updateList.bind(this);
    }

    componentDidUpdate(prevProps){
        if(prevProps.ingredients !== this.props.ingredients){
            this.setState({
                ingredients: this.props.ingredients
            });
        }
    }

    updateList(ingredients){
        this.setState({
            ingredients: ingredients
        });
    }

    render(){
        const items = this.state.ingredients.map((ingredient) =>
            <ListItem key={ingredient.id} ingredient={ingredient} updateList={this.updateList} />
        );

        return (
            <div>
                <h3>Ingredients:</h3>
                <ul className="ingredient-list pl-0">
                    {items}
                </ul>
            </div>
        );
    }
}

export default IngredientList;