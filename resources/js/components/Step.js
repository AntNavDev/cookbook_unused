import React from 'react';

class Step extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            name: this.props.data.name
        };
    }

    render(){
        return(
            <div>This is a step component</div>
        );
    }
}

export default Step;