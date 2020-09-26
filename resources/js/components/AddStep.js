import React from 'react';
import ReactDOM from 'react-dom';
import StepList from './StepList';

class AddStep extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            steps: this.props.data.steps
        };
    }

    render(){
        return(
            <div className="row">
                <div className="col-md-12">
                    <StepList
                        steps={ this.state.steps } />
                </div>
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
            <AddStep
                data={this.state.data} />
        );
    }
}

if(document.getElementById('add-step')){
    var data = document.getElementById('add-step').getAttribute('data');
    const element = <App data={data} />
    ReactDOM.render(
        element,
        document.getElementById('add-step')
    );
}