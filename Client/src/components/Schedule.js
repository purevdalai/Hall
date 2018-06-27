import React, { Component } from 'react';
import Box from './Box';
import { nextTime } from './Time';

class Schedule extends Component {

    constructor(props) {
        super(props);

        this.state = {resizeBox: {}, height: {max:1002,min:50}, setBox:[], timeCoord: [] };
    }

    placeEventDef(elm, event) {
        const eventElm = elm.refs.event;
        const eventDesc = elm.refs.desc;

        this.setEventHeight(eventElm, eventDesc, 50);

        eventElm.style.display = 'block';
        eventElm.style.background = event.color;

        elm.showEvent();
        elm.setState({event:event});
    }


    createFromJson() {
        const events = this.props.events;
        events.map(event => 
            {
                const startElm  = this.getBoxContElm(event.day, event.start);
                const endElm    = this.getBoxContElm(event.day, event.end); 

                if(this.isElementRef(startElm) && this.isElementRef(endElm)) {
                    this.placeEvent(startElm, endElm, event);
                }
                else if(this.isElementRef(startElm)) {
                    this.placeEventDef(startElm, event);
                }
            }
        );
    }

    initCoord() {
        const timeCoord = this.state.timeCoord;
        
        if(timeCoord.length === 0) {       
            const times = this.props.times;
            times.map( (time, i) => {
                    const elm = this.getBoxContElm(3, time);
                    if(this.isElementRef(elm)) {
                        const top = elm.refs.box.offsetTop;
                        timeCoord.push({time:time, coord: {min:top, max:top+50}});
                    }
                }
            );
            this.setState({timeCoord:timeCoord});
        }
    }

    getBoxContElm(day, time) {
        const elm = this.refs['box-container-' + day + '-' + time];
        return elm;
    }

    isElementRef(elm) {
        if(this.isElement(elm) && this.isElement(elm.refs)) 
            return true;
        return false;
    }

    isElement(elm) {
        if(typeof elm !== 'undefined') 
            return true;
        return false;
    }

    placeEvent(elm, nextElm, event) {
        
        const boxElm = elm.refs.box;
        const nextBoxElm = nextElm.refs.box;
        const height = nextBoxElm.offsetTop - boxElm.offsetTop;

        const eventElm = elm.refs.event;
        const eventDesc = elm.refs.desc;
        
        this.setEventHeight(eventElm, eventDesc, height);

        eventElm.style.display = 'block';

        eventElm.style.background = event.color;
        
        elm.showEvent();
        elm.setState({event:event});
    }

    /**
     * @param eventElm event div
     * @param descElm description div
     * @param resizeHeight shinechleh ondor
     * @description Event bolon tuunii dotorh text field -n height-g shinechileh function
     */
    setEventHeight(eventElm, descElm, resizeHeight) {
        if(resizeHeight < this.state.height.min) resizeHeight = this.state.height.min;
        eventElm.style.height = resizeHeight + 'px';
        descElm.style.height = (resizeHeight - 4) + 'px';
    }

    
    /** 
    * @description resize hiij duussang medegdeh
    */
    handleUp() {
        this.setState({resizeBox: {isResize: false}});
    }

    /***
     * @param e mouse songoson element
     * @description herev event-g resize hj baival tuhain event-n hemjeeg shinechleh ba mon 
     * event-n endTime -g shinechlene. 
     */
    handleMove(e) {
        if(this.state.resizeBox.isResize) {
            const cursorY = e.pageY;
            const timeCoord = this.state.timeCoord;
            let time;

            timeCoord.map((timeCor) => {
                if(timeCor.coord.min < cursorY && cursorY < timeCor.coord.max) {
                    time = timeCor.time;
                }
            });

            const day = this.state.resizeBox.day;
            const elm = this.getBoxContElm(day, this.state.resizeBox.time);
            const paddElm = this.getBoxContElm(day, time);
           
            if(this.isElementRef(paddElm)) {
                const elmHeight = elm.refs.box.offsetTop;
                const paddHeight = paddElm.refs.box.offsetTop;
                const resizeHeight = paddHeight - elmHeight;
                this.setEventHeight(elm.refs.event, elm.refs.desc, resizeHeight);

                time = this.isEmpty(this.state.resizeBox.time, time);
                this.setEventEndTime(this.state.resizeBox.event, nextTime(time));
            }
        }
    }

    isEmpty(start, end) {
        const day = this.state.resizeBox.day;
        const rangeTime = [];
        const timeCoord = this.state.timeCoord;
        timeCoord.map((timeCor) => {
            if(timeCor.time > start && timeCor.time <= end) {
                rangeTime.push(timeCor.time);
            }
        });
        let currTime;
        rangeTime.map(time => {
            const elm = this.getBoxContElm(day, time);
            if(elm.isShow()) {
                currTime = time;
            }
        });
        if(!this.isElement(currTime)) {
            return end;
        }
        return currTime;
    }
    
    /***
     * @param day event-n odor
     * @param index index
     * @param endTime shine endTime
     * @description event -n endTime -g shinechleh func
     */
    setEventEndTime(event, endTime) {
        this.props.setEndTime(event, endTime);
    }

    /***
     * @param day event div -n day attr
     * @param index event div -n index attr
     * @param top event div -n top
     * @param height event div-n height
     * @description resize hiih gj bui event -n medeelelg tsugluulah
     */
    resizing(day, time, event) {
        this.setState({resizeBox: {time:time, day:day, isResize: true, event: event}})
    }

    /**
    *  @param event event nemeh
    *  @description shine event nemeh
    */
    addEvent(event) {
        this.props.addEvent(event);
    }

    deleteEvent(event) {
        this.props.deleteEvent(event);
    }

    editEvent(event) {
        this.props.editEvent(event);
    }

    render() {

        this.createFromJson();
        this.initCoord();

        const times = this.props.times;
        const week = this.props.week;
        const events = this.props.events;

        const timeList = times.map((time, i) =>
            <div key={i} className="cd-box text-center" time={time}>
                <span>{time} - {nextTime(time)}</span>
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
                                editEvent={this.editEvent.bind(this)}
                                deleteEvent={this.deleteEvent.bind(this)}
                                addEvent={this.addEvent.bind(this)}
                                handleMove={this.handleMove.bind(this)}
                                events={events} 
                                key={index} 
                                time={time} 
                                index={index}
                                day={i}
                                ref={'box-container-'+i+'-'+time}
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