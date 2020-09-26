import React from 'react';

class Step extends React.Component {
    constructor(props){
        super(props);
        console.log("The props for the step:", this.props.data);
        this.state = {
            name: this.props.data.name
        };
    }

    render(){
        return(
            <div>Step: { this.state.name }</div>
        );
    }
}

export default Step;