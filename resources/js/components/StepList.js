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
        const step_list = this.state.steps.map((step) =>
            <Step key={step.id} data={{ name: step.name }} />
        );

        return(
            <div>
                <ul>
                    {step_list}
                </ul>
            </div>
        );
    }
}

export default StepList;