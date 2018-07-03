import React, { Component } from 'react';
import Modal from './Modal';
import Note from './Note';
import Resizer from './Resizer';

class Box extends Component {
    
    constructor(props) {
        super(props);

        /** child-n function duudah zoriulaltaar ref uusgev. */
        this.modal = React.createRef();

        this.state = {isResizing: false, height: 0 , boxStyle: {}, eventStyle: {}};
    }

    openModal(){
        this.modal.current.open();
    };

    /**
     * Generate color code
     * @returns color code
     */
    getRandomColor() {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }
    
    /**
     * 
     * @param {*} e element
     * darsan class-n ner ni 
     *                  1. box bol shine event uusne
     *                  2. event bol edit hiine.  
     */
    createEvent() {
        const color = this.getRandomColor();
        this.setState({
            boxStyle: {
                display: 'none'
            },

            eventStyle: {
                display: 'block',
                backgroundColor: ''+color
            }
        });
    }

    componentWillMount() {

        this.setState({
            boxStyle: {
                display: 'block'
            },

            eventStyle: {
                display: 'none'
            }
        });
    }


    updateStateResizing(isResizing) {
        this.setState({
            isResizing: isResizing,
        });
    }

    updateStateHeight(height) {
        this.props.updateStateHeight(height);
    }

    move(e) {
        if(this.state.isResizing) {
            const height =  50 + (e.clientY - this.props.height);
            
            // this.setState({
            //     divStyle: {
            //         height: height,
            //         paddingTop: height
            //     }x
            // });
        }
    }

    mouseUp() {
        
    }

    render() {
        const time = this.props.time;
        const index = this.props.index;
        const day = this.props.day;

        return (
                <div>
                    <div
                        className="box"
                        onMouseDown={this.createEvent.bind(this)}
                        style={this.state.boxStyle}
                    > 
                    </div>
                    
                    
                    <div
                        className={"event-"+index}
                        id="event"
                        key={index}
                        time={time}
                        index={index}
                        day={day}
                        onMouseUp={this.mouseUp.bind(this)}
                        onMouseMove={this.move.bind(this)}
                        onMouseDown={this.openModal.bind(this)}
                        style={this.state.eventStyle}
                    >
           
                        <Modal ref={this.modal} />

                        <Note description="Halo!" />

                        <Resizer 
                            updateStateResizing={this.updateStateResizing.bind(this)}
                            updateStateHeight={this.updateStateHeight.bind(this)}
                        />

                    </div>
                </div>
        );
    }
}

export default Box;