import React from 'react';
import ReactDOM from 'react-dom';
import StepList from './StepList';

class ViewStepList extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            steps: this.props.data.steps,
        };
    }

    render(){
        return(
            <div>
                <StepList
                    steps={this.state.steps} />
            </div>
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
            <ViewStepList
                data={this.state.data} />
        );
    }
}

if(document.getElementById('view-step-list')){
    var data = document.getElementById('view-step-list').getAttribute('data');
    const element = <App data={data} />
    ReactDOM.render(
        element,
        document.getElementById('view-step-list')
    );
}