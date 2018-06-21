import React, { Component } from 'react';
import Box from './Box';
import { nextTime } from './Time';

class Schedule extends Component {

    constructor() {
        super();
        this.state = {box: {}, height: {max:1002,min:50}};
    }

    setEventHeight(eventElm, descElm, resizeHeight) {
        eventElm.style.height = resizeHeight + 'px';
        descElm.style.height = (resizeHeight - 4) + 'px';
    }

    fillResize(eventElm, descElm, top) {
        if(top < this.state.height.min) top = this.state.height.min;

        setTimeout( function() {
            eventElm.style.height = top + 'px';
            descElm.style.height =  top + 'px';
        }, 3000);
    }

    handleMove(e) {
        if(this.state.box.resizing) {
            const day = this.state.box.day;
            const index = this.state.box.index;

            const elm = this.refs['box-container-' + day + '-' + index];
           
            const eventElm = elm.refs.event;
            const descElm = elm.refs.desc;

            const resizeHeight = 50 + (e.clientY - this.state.box.height);

            this.setEventHeight(eventElm, descElm, resizeHeight);

            const targetTop = e.target.offsetTop;
            const eventTop = eventElm.offsetTop;
            let top = 50 + (targetTop - eventTop);

            this.fillResize(eventElm, descElm, top);

            const targetTime = e.target.getAttribute('time');
            const endTime = nextTime(targetTime+'');
            this.setEventEndTime(day, index, endTime);
        }
    }
    
    setEventEndTime(day, index, endTime) {
        console.log(day , index, endTime);
    }

    resizing(isResize, day, index, height) {
        this.setState({box: {index:index, day:day, resizing: isResize, height:height}})
    }

    addEvent(events) {
        this.props.addEvent(events);
    }

    handleUp() {
        this.setState({box: {resizing: false}})
    }

    render() {
        const times = this.props.times;
        const week = this.props.week;
        const events = this.props.events;

        const timeList = times.map((time, i) =>
            <div key={i} className="cd-box text-center" time={time}>
                <span>{time}</span>
            </div>
        );

        const weekList = week.map((day, i) =>
            <div className="cd-row" key={i}>
                <div className="cd-box text-center">    
                    <span> {day} </span>
                </div>
                
                { i === 0 && timeList }
                { i > 0 && 

                    times.map(
                        (time, index) =>
                        <Box 
                            resizing={this.resizing.bind(this)}
                            addEvent={this.addEvent.bind(this)}
                            handleMove={this.handleMove.bind(this)}
                            events={events} 
                            key={index} 
                            time={time} 
                            index={index} 
                            day={i}
                            ref={'box-container-'+i+'-'+index}
                            />
                    )
                }
            </div>
        );

        return (   
            <div className="cd-schedule" onMouseUp={this.handleUp.bind(this)}>
                {weekList}
            </div>
        );
    }
}

export default Schedule;