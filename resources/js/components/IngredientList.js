import React from 'react';
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
        // console.log("Delete the resource.");
        // let object_id = this.state.id;
        // fetch()
        // .then()
        // .then(function(data){
        //     console.log("data from fetch", data);
        // });
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

    componentDidUpdate(prevProps){
        if(prevProps.ingredients !== this.props.ingredients){
            this.setState({
                ingredients: this.props.ingredients
            });
        }
    }

    render(){
        const items = this.state.ingredients.map((ingredient) =>
            <ListItem key={ingredient.id} id={ingredient.id} name={ingredient.name} />
        );

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

export default IngredientList;