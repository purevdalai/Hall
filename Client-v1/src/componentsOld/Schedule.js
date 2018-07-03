import React, { Component } from 'react';
import Timeline from './Timeline';
import Day from './Day';

class Schedule extends Component {

    render() {
        const times = this.props.times;
        const week = this.props.week;
        const events = this.props.events;
        
        const timesTag = times.map((time, index) =>
            <Timeline 
                key={index} 
                time={time} 
            />
        );

        const weekTag = week.map((day, i) =>
            <Day 
                events={events} 
                times={times} 
                day={day} 
                index={i} 
                key={i} 
            />
        );

        return (
            <div onMouseDown={this.props.onMouseDown}>
                <div className="timeline">
                    <ul>
                        {timesTag}
                    </ul>
                </div>
                <div className="events">
                    <ul>
                        {weekTag}
                    </ul>
                </div>
            </div>
        );
    }
}

export default Schedule;