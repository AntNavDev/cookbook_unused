import React from 'react';
import Step from './Step';

class StepList extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            steps: [
                { id: 1, name: "Gathering Ingredients" },
                { id: 2, name: "Mixing" },
            ]
        };
    }

    render(){
        const step_list = this.state.steps.map((step) =>
            <Step key={step.id} data={{ name: step.name }} />
        );
        console.log("step_list:", step_list);
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