import React, { Component } from 'react';
import BoxContainer from './BoxContainer';

class Day extends Component {

    render() {
        const day = this.props.day;
        const i = this.props.index;
        const times = this.props.times;
        const events = this.props.events;

        return (
            <li className="events-group">
                <div className="top-info"><span>{day}</span></div>
                <ul className="day-event-list">
                    <BoxContainer 
                        index={i}
                        times={times}
                        events={events}
                    />
                </ul>
            </li >
        );
    }
}

export default Day;