import React from 'react';
import ReactDOM from 'react-dom';

class InfoMessage extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            message: this.props.messageData.message,
            showMessage: this.props.messageData.showMessage,
            level: this.props.messageData.level
        };

        this.resetData = this.props.resetData.bind(this);
    }

    componentDidMount(){
        setTimeout(() => {
            this.setState({
                showMessage: false
            });

            this.resetData();
            // document.getElementById('info-message').setAttribute('data', JSON.stringify({}));
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
            data: JSON.parse(this.props.data),
            isApp: true,
            childKey: 0,
        };

        this.resetData = this.resetData.bind(this);
    }

    componentDidUpdate(prevProps){
        if(prevProps.data !== this.state.data){
            this.setState({
                data: this.props.data
            });
        }
    }

    componentDidMount(){
        this.setState((state, props) => {
            childKey: (state.childKey + 1)
        });
    }

    resetData(){
        // this.setState({
        //     data: {}
        // });
        console.log("Find node:", ReactDOM.findDOMNode(this));
        // ReactDOM.unmountComponentAtNode(ReactDOM.findDOMNode(this));
    }

    render(){
        // var rendered = <div className="d-none"></div>;
        // if(this.props.data){
            var rendered = <InfoMessage
                            key={this.state.childKey}
                            messageData={this.state.data}
                            messageTimeout={3000}
                            resetData={this.resetData} />;
        // }
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
                ReactDOM.render(
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