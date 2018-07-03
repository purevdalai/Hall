import React, { Component } from 'react';
import EventForm from './EventForm';

class Modal extends Component {

    constructor(props) {
        super(props);

        this.state = {
            text : '',
            display: {
                display: 'none'
            }
        };

        this.handler = this.handler.bind(this);
    }

    open() {
        this.setState({
            display: {
                display: 'block'
            }
        });
    }

    close() {
        this.setState({
            display: {
                display: 'none'
            }
        });
    }


    handler(e) {
        e.preventDefault();
        this.setState({
            text: e.target.value
        });
    }

    render() {
        console.log(this.state.text);

        return (
            <div id="myModal" className="modal" style={this.state.display}>
                <div className="modal-content">
                    <span className="close" onClick={this.close.bind(this)}>&times;</span>
                    <EventForm handler={this.handler} text={this.state.text}  />
                </div>
            </div>
        );
    }
}

export default Modal;