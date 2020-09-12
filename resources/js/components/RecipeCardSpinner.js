import React from 'react';
import ReactDOM from 'react-dom';
import RecipeCard from './RecipeCard';

class RecipeCardSpinner extends React.Component {
    constructor(props){
        super(props);
        this.state = { recipes: this.props.recipes };
    }

    render(){
        const spinner = this.state.recipes.map((recipe) => <RecipeCard key={recipe.id} recipe={recipe} />);
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