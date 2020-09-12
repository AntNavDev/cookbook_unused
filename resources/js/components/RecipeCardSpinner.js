import React from 'react';
import ReactDOM from 'react-dom';
import RecipeCard from './RecipeCard';

const spinner_length = 5;

class RecipeCardSpinner extends React.Component {
    constructor(props){
        super(props);
        this.state = { displayed_recipes: this.props.recipes.slice(0, spinner_length), recipe_index: 0 };
    }

    componentDidMount(){
        this.timerID = setInterval(
            () => this.updateSpinner(),
            5000
        );
    }

    componentWillUnmount(){
        clearInterval(this.timerID);
    }

    updateSpinner(){
        var updated_array = this.props.recipes.slice(this.state.recipe_index, spinner_length);
        if(updated_array.length < spinner_length){
            updated_array = updated_array.concat(this.props.recipes.slice(0, (spinner_length - updated_array.length)));
        }
        var updated_index = this.state.recipe_index + 1;
        if(updated_index >= spinner_length){
            updated_index = 0;
        }
        this.setState((state, props) => {
            return {
                displayed_recipes: updated_array,
                recipe_index: updated_index
            };
        });
    }

    render(){
        const spinner = this.state.displayed_recipes.map((recipe) => <RecipeCard key={recipe.id} recipe={recipe} />);
        return(
            <ul>
                {spinner}
            </ul>
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
            <RecipeCardSpinner recipes={this.state.data.recipes} />
        );
    }
}

if(document.getElementById('recipe-spinner')){
    var data = document.getElementById('recipe-spinner').getAttribute('data');
    const element = <App data={data} />;
    ReactDOM.render(
        element,
        document.getElementById('recipe-spinner')
    );
}