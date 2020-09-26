import React from 'react';
import ReactDOM from 'react-dom';
import StepList from './StepList';
import StepCarousel from './StepCarousel';

class AddStep extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            steps: this.props.data.steps,
            user_view: 'StepCarousel',
        };
    }

    render(){
        let user_view = '';

        switch(this.state.user_view){
            case 'StepList':
                user_view = <StepList steps={ this.state.steps } />;
                break;
            case 'StepCarousel':
                user_view = <StepCarousel />
                break;

        }

        return(
            <div className="row">
                <div className="col-md-12">
                    {user_view}
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