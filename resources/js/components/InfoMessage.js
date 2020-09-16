import React from 'react';
import ReactDom from 'react-dom';

class InfoMessage extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            message: this.props.messageData.message,
            showMessage: this.props.messageData.showMessage,
            level: this.props.messageData.level,
        };
    }

    // componentDidMount(){
    //     setInterval(() => {
    //         this.setState({
    //             showMessage: false
    //         });
    //     }, this.props.messageTimeout);
    // }

    // componentDidUpdate(prevProps){
    //     console.log("Check update:", this.props.messageData);
    //     if(prevProps.showMessage !== this.props.messageData.showMessage){
    //         this.setState({
    //             message: this.props.messageData.message
    //         });
    //     }
    // }

    render(){
        var renderedElement = <div className='d-none'></div>;
        if(this.state.showMessage){
            const messageClasses = this.state.level;
            renderedElement = <div className={messageClasses}>{this.state.message}</div>;
        }
        return (
            renderedElement
        );
    }
}

class App extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            data: JSON.parse(this.props.data)
        };
    }

    componentDidUpdate(prevProps){
        console.log("Check update:", this.props.data);
        if(prevProps.data.showMessage !== this.props.data.showMessage){
            this.setState({
                data: this.props.data
            });
        }
    }

    render(){
        var rendered = <div className="d-none"></div>;
        if(this.props.data){
            rendered = <InfoMessage messageData={this.state.data} messageTimeout={3000} />;
        }
        return (
            rendered
        );
    }
}

if(document.getElementById('info-message')){
    var target = document.getElementById('info-message');
    var observer = new MutationObserver(function(mutations){
        console.log("mutated", mutations.type);
        mutations.forEach(function(mutation){
            if(mutation.type === 'attributes'){
                var data = document.getElementById('info-message').getAttribute('data');
                const element = <App data={data} />;
                ReactDom.render(
                    element,
                    document.getElementById('info-message')
                );
            }
        });
    });

    observer.observe(target, {
        attributes: true
    });
}