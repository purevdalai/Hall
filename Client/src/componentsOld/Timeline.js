import React, { Component } from 'react';

class Timeline extends Component {
    render() {
        return (
            <li ref={'time_'+this.props.time}>
                <span>
                    {this.props.time}
                </span>
            </li>
        );
    }
}

export default Timeline;