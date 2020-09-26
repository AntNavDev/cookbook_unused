import React from 'react';
import Step from './Step';

class StepList extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            steps: this.props.steps
        };
    }

    render(){
        const items = this.state.steps.map((step) =>
            <li key={step.id}><Step data={{ name: step.name }} /></li>
        );

        return(
            <div>
                <h3>Steps</h3>
                <ul className="step-list pl-0">
                    {items}
                </ul>
            </div>
        );
    }
}

export default StepList;