import React from 'react';
import Step from './Step';
import Modal from 'react-bootstrap/Modal';

class StepList extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            steps: this.props.steps,
            showModal: this.props.showModal,
        };
    }

    render(){
        var view = '';
        if(this.state.showModal){
            const items = this.state.steps.map((step) =>
                <li key={step.id}><Step data={{ name: step.name }} /></li>
            );

            view = (
                <Modal show={this.state.showModal} onHide={() => this.setState({showModal: false})}>
                    <Modal.Header closeButton>
                        <Modal.Title>Steps</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <h3>Steps</h3>
                        <ul className="step-list pl-0">
                            {items}
                        </ul>
                    </Modal.Body>
                </Modal>
            );
        } else {
            const items = this.state.steps.map((step) =>
                <li key={step.id}><Step data={{ name: step.name }} /></li>
            );

            view = (
                <div>
                    <h3>Steps</h3>
                    <ul className="step-list pl-0">
                        {items}
                    </ul>
                </div>
            );
        }

        return(
            <div>
                {view}
            </div>
        );
    }
}

export default StepList;