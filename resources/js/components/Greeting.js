import React from 'react';
import ReactDOM from 'react-dom';
import Clock from './Clock';

class Greeting extends React.Component {
    constructor(props){
        super(props);
        this.state = { name: this.props.name };
    }

    render(){
        return (
            <div>
                Hello, {this.state.name}!
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
        return (
            <div>
                <Greeting name={this.state.data.name} />
                <Clock />
            </div>
        );
    }
}

var data = document.getElementById('root').getAttribute('data');
const element = <App data={data} />;
ReactDOM.render(
    element,
    document.getElementById('root')
);