import React from 'react';

class Step extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            name: this.props.data.name,
            showDetails: this.props.showDetails,
        };
    }

    render(){
        return(
            <>
                <div>{ this.state.name }</div>
                <div>{ this.state.showDetails ? this.state.description : '' }</div>
            </>
        );
    }
}

export default Step;