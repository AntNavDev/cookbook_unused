import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { messageContainer } from './../globals.js';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

class ListItem extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            ingredient: this.props.ingredient,
            showDeleteModal: false,
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
            var messageData = {
                message: data.message
            };

            if(data.success){
                this.updateList(data.ingredients);
                messageData.level = 'success';
            }
            else{
                messageData.level = 'error';
            }

            messageContainer.setAttribute('data', JSON.stringify(messageData));
        });
    }

    render(){
        var delete_icon = this.props.canDelete ? <FontAwesomeIcon icon={faTrash} className="float-right" onClick={() => this.setState({showDeleteModal: true})} /> : '';
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
                        {delete_icon}
                    </div>
                </div>

                <Modal show={this.state.showDeleteModal} onHide={() => this.setState({showDeleteModal: false})}>
                    <Modal.Header closeButton>
                        <Modal.Title>Delete {this.state.ingredient.name}?</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        This will permanently remove {this.state.ingredient.name} from the ingredient list.
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => this.setState({showDeleteModal: false})}>
                            Close
                        </Button>
                        <Button variant="danger" onClick={this.deleteObject}>
                            Delete
                        </Button>
                    </Modal.Footer>
                </Modal>
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
            <ListItem key={ingredient.id} ingredient={ingredient} updateList={this.updateList} canDelete={this.props.canDeleteItems} />
        );

        return (
            <div>
                <h3>Ingredients</h3>
                <ul className="ingredient-list pl-0">
                    {items}
                </ul>
            </div>
        );
    }
}

export default IngredientList;