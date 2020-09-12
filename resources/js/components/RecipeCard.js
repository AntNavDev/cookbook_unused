import React from 'react';

const image_directory = "/storage/images/";

class RecipeCard extends React.Component {
    constructor(props){
        super(props);
        this.state = { recipe: this.props.recipe };
    }

    render(){
        const src = image_directory + this.state.recipe.display_image.filename;
        return(
            <li className="recipe-spinner-item">
                <div className="card m-2">
                    <div className="card-header">
                        {this.state.recipe.name}
                    </div>
                    <div className="card-body text-center">
                        <img src={src} alt={this.state.recipe.display_image.name} />
                        <div className="dark-backdrop p-2">
                            {typeof this.state.recipe.description !== 'undefined' ? this.state.recipe.description : ''}
                        </div>
                    </div>
                </div>
            </li>
        );
    }
}

export default RecipeCard;