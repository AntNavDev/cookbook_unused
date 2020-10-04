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
            recipeID: this.props.data.recipeID,
            showForm: false
        };

        this.updateIngredients = this.updateIngredients.bind(this);
        this.toggleShowForm = this.toggleShowForm.bind(this);
    }

    updateIngredients(ingredients){
        this.setState({
            ingredients: ingredients
        });
    }

    toggleShowForm(){
        this.setState((state, props) => ({
            showForm: !state.showForm
        }));
    }

    render(){
        var formElement = '';
        if(this.props.canAddItems)
        {
            formElement = <button onClick={this.toggleShowForm}>Add Ingredient</button>;
            if(this.state.showForm){
                formElement = <AddIngredientForm
                                formAction={this.state.formAction}
                                recipeID={this.state.recipeID}
                                updateIngredients={this.updateIngredients}
                                toggleShowForm={this.toggleShowForm} />
            }
        }
        return(
            <div className="row">
                <div className="col-md-6">
                    <IngredientList
                        ingredients={this.state.ingredients}
                        updateIngredients={this.updateIngredients}
                        canDeleteItems={this.props.canDeleteItems} />
                </div>
                <div className="col-md-6 float-right">
                    {formElement}
                </div>
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
            <AddIngredient
                data={this.state.data}
                canAddItems={this.state.data.canAlterItems}
                canDeleteItems={this.state.data.canAlterItems} />
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