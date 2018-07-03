import React, {Component} from 'react';
import  { getRandomColor } from './Color';
import { nextTime } from './Time';


class Box extends Component {

    constructor(props) {
        super(props);
        this.state = {isEventShow:false, event:{}};
    }

    showEvent() {
        this.setState({isEventShow: true})
    }

    isShow() {
        if(this.state.isEventShow) 
            return true;
        return false;
    }

    createEvent() {
        if(!this.isShow()) 
        {
            const color = getRandomColor();

            const eventElm = this.refs.event;
            const boxElm = this.refs.box;

            const height = boxElm.clientHeight + 'px';
            // const width = boxElm.clientWidth + 'px'; 
    
            eventElm.style.height = height;
            // eventElm.style.width = width;
            eventElm.style.background = color;
            eventElm.style.display = 'block';
            
            const events = this.props.events;
            const time  = boxElm.getAttribute('time');
            const day = boxElm.getAttribute('day');

            const event = {
                id: events.length + 1,
                day: day,
                name: 'Untitled',
                phone: 'Untitled',
                start: time,
                end: nextTime(time),
                color: color
            };

            this.setState({event:event});
            this.props.addEvent(event);
            this.showEvent();
        }
    }

    /**
    * @param e resize div-n cursor bairshil
    * @description resize hiih gj buig medegdeh
    */
    resize(e) {
        const event = this.state.event;
        this.props.resizing(this.props.day, this.props.time, event);
    }
    
    /**
     * @param e mouse guij bui element
     * @description mouse move hj bui element-g barij avah
     */
    handleMove(e) {
        this.props.handleMove(e);
    }

    addNote(e) {
        const value = e.target.value + '';
        const event = this.state.event;
        event.name = value;
        this.setState({event:event});
        this.props.editEvent(this.state.event);
    }

    addNote(e) {
        const elm = e.target;

        if(elm.children.length === 0) {
            const eventElm = this.refs.event;
            const text = elm.innerHTML;
            elm.innerHTML = '';
            const input = document.createElement("textarea");
            input.value = text+'';

            input.style.background = eventElm.style.background;
            input.onchange = this.addNote.bind(this);
            elm.append(input);
        }
    }

    removeEventElm() {
        const eventElm = this.refs.event;
        const height = '0px'; 

        eventElm.style.height = height;
        eventElm.style.display = 'none';
    }

    delete() {
        this.removeEventElm();
        this.setState({isEventShow:false, event:{}});
        this.props.deleteEvent(this.state.event);
    }

    render() {
        const time = this.props.time; 
        const index = this.props.index;
        const day = this.props.day;

        return (
            <div 
                onMouseMove={this.handleMove.bind(this)}
                onMouseDown={this.createEvent.bind(this)}>
                <div 
                    className="cd-box text-center" 
                    time={time}  
                    index={index} 
                    day={day}
                    order='0'
                    ref='box'>
                </div>
                <div 
                    className="cd-event text-center" 
                    ref='event'> 
                    <span 
                        onMouseDown={this.delete.bind(this)}
                        className="cd-close">&times;</span>
                    <div 
                        onMouseDown={this.addNote.bind(this)}
                        className="cd-description" 
                        ref='desc'>
                            {this.state.event.name}
                    </div>
                    <div 
                        onMouseDown={this.resize.bind(this)}
                        className="cd-resizer" 
                        >
                    </div>
                </div>
            </div>
        );
    }
}

export default Box;