import React, {Component} from 'react';
import  { getRandomColor , invertColor} from './Color';
import { nextTime } from './Time';


class Box extends Component {

    constructor(props) {
        super(props);
        this.state = {isEventShow:false, event:{}};
    }

    createEvent(e) {
        if(!this.state.isEventShow) 
        {
            const color = getRandomColor();

            const eventElm = this.refs.event;
            const boxElm = this.refs.box;

            const height = boxElm.clientHeight + 'px';
            const width = boxElm.clientWidth + 'px'; 
    
            eventElm.style.height = height;
            eventElm.style.width = width;
            eventElm.style.background = color;
            eventElm.style.display = 'block';

            
            const events = this.props.events;
            const time  = boxElm.getAttribute('time');
            const day = boxElm.getAttribute('day');

            const event = {
                id: events.length,
                day: day,
                description: 'Untitled',
                start: time,
                end: nextTime(time),
            };

            this.setState({event:event});
            
            events.push(event);
            this.props.addEvent(events);
            
            this.setState({isEventShow: true})
        }
    }
    
    resize(e) {
        this.props.resizing(true, this.props.day, this.props.index, e.clientY);
    }

    openModal(e) {

    }

    handleMove(e) {
        this.props.handleMove(e);
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
                    ref='box'>
                </div>
                <div 
                    className="cd-event text-center" 
                    ref='event'
                    onMouseDown={this.openModal.bind(this)}> 
                    <div className="cd-description" ref='desc'>
                        {this.state.event.description}
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