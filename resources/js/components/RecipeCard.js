import React from 'react';

class RecipeCard extends React.Component {
    constructor(props){
        super(props);
        this.state = { recipe: this.props.recipe };
    }

    render(){
        console.log("Recipe: ", this.state.recipe);
        return(
            <li className="recipe-spinner-item">
                {this.state.recipe.name}
            </li>
        );
    }
}

export default RecipeCard;