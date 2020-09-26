import React from 'react';
import ReactDOM from 'react-dom';
import StepList from './StepList';

class AddStep extends React.Component {
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div className="row">
                <div className="col-md-12">
                    <StepList />
                </div>
            </div>
        );
    }
}

class App extends React.Component {
    constructor(props){
        super(props);
    }

    render(){
        return(
            <AddStep />
        );
    }
}

if(document.getElementById('add-step')){
    const element = <App />
    ReactDOM.render(
        element,
        document.getElementById('add-step')
    );
}