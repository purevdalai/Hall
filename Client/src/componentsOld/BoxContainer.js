import React, { Component } from 'react';
import Box from './Box';

class Day extends Component {

    constructor(props) {
        super(props);
        this.state = {
            heights: 0
        }
    }

    updateStateHeight(height) {
        this.setState({height: height});
    }

    render() {
        const i = this.props.index;
        const times = this.props.times;
        const events = this.props.events;

        const boxes = times.map((time, index) =>
            <Box 
                height={this.state.height}
                updateStateHeight={this.updateStateHeight.bind(this)}
                events={events} 
                day={i + 1} 
                time={time} 
                index={index} 
                key={index} />
        );

        return (
            <div>
                {boxes}
            </div>
        );
    }
}

export default Day;