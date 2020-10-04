import React from 'react';
import ReactDOM from 'react-dom';
import StepList from './StepList';
import StepCarousel from './StepCarousel';
import AddStepForm from './AddStepForm';

class AddStep extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            steps: this.props.data.steps,
            user_view: 'StepList',
            formAction: this.props.data.formAction,
            recipeID: this.props.data.recipeID,
        };

        this.showView = this.showView.bind(this);
        this.updateSteps = this.updateSteps.bind(this);
    }

    showView(view){
        this.setState({
            user_view: view
        });
    }

    updateSteps(steps){
        this.setState({
            steps: steps
        });
    }

    render(){
        let user_view = '';

        switch(this.state.user_view){
            case 'StepList':
                user_view = <StepList steps={ this.state.steps } />;
                break;
            case 'StepCarousel':
                user_view = <StepCarousel />;
                break;
            case 'AddStepForm':
                user_view = <AddStepForm
                                formAction={this.state.formAction}
                                recipeID={this.state.recipeID}
                                updateSteps={this.updateSteps}
                                showView={this.showView} />;
                break;

        }

        return(
            <div className="row">
                <div className="col-md-12">
                    <div className="row">
                        <div className="col-md-12">
                            <button className="mr-2" onClick={() => this.showView('StepList')}>Steps</button>
                            <button className="mx-2" onClick={() => this.showView('StepCarousel')}>Carousel</button>
                            <button className="mx-2" onClick={() => this.showView('AddStepForm')}>Add Step</button>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-12">
                            {user_view}
                        </div>
                    </div>
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