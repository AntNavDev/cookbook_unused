import React from 'react';
import ReactDOM from 'react-dom';

const messageContainer = document.getElementById('info-message');

class InfoMessage extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            message: this.props.messageData.message,
            level: this.props.messageData.level
        };
    }

    render(){
        const messageClasses = "info-message message-level-" + this.state.level;

        return (
            <div className={messageClasses}>{this.state.message}</div>
        );
    }
}

class App extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            data: JSON.parse(this.props.data),
            messageTimeout: this.props.data.messageTimeout ? this.props.data.messageTimeout : 3000
        };
    }

    componentDidMount(){
        setTimeout(() => {
            ReactDOM.unmountComponentAtNode(ReactDOM.findDOMNode(messageContainer));
        }, this.state.messageTimeout);
    }

    render(){
        return (
            <InfoMessage messageData={this.state.data} />
        );
    }
}

if(messageContainer){
    var observer = new MutationObserver(function(mutations){
        mutations.forEach(function(mutation){
            if(mutation.type === 'attributes'){
                var data = messageContainer.getAttribute('data');
                const element = <App data={data} />;
                ReactDOM.render(
                    element,
                    messageContainer
                );
            }
        });
    });

    observer.observe(messageContainer, {
        attributes: true
    });
}