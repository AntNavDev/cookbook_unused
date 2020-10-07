import React from 'react';

class Step extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            step: this.props.step,
            showDetails: this.props.showDetails,
        };
    }

    render(){
        return(
            <>
                <div>{ this.state.step.name }</div>
                <div>{ this.state.showDetails ? this.state.step.description : '' }</div>
            </>
        );
    }
}

export default Step;