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

        this.resetData = this.props.resetData.bind(this);
    }

    componentDidMount(){
        setTimeout(() => {
            this.setState({
                showMessage: false
            });
            console.log("Resetting data in infomessage component");
            this.resetData();
        }, this.props.messageTimeout);
    }

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
            const messageClasses = "info-message message-level-" + this.state.level;
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

        this.resetData = this.resetData.bind(this);
    }

    componentDidUpdate(prevProps){
        console.log("Check update prevProps:", prevProps.data);
        console.log("this.state.data:", this.state.data);
        console.log("this.props.data", this.props.data);
        if(prevProps.data !== this.state.data){
            this.setState({
                data: this.props.data
            });
        }
    }

    resetData(){
        this.setState({
            data: {}
        });
    }

    render(){
        var rendered = <div className="d-none"></div>;
        if(this.props.data){
            rendered = <InfoMessage
                            messageData={this.state.data}
                            messageTimeout={3000}
                            resetData={this.resetData} />;
        }
        return (
            rendered
        );
    }
}

if(document.getElementById('info-message')){
    var target = document.getElementById('info-message');
    var observer = new MutationObserver(function(mutations){
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