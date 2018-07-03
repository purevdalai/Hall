import React, { Component } from 'react';

class EventForm extends Component {

    render() {
        const divStyle = {
            width: '100%',
            padding: '50px'
        };

        const inputStyle = {
            width: '100%',
            height: '50px'
        };
        
        const secDivStyle = {
            marginBottom: '20px'
        };

        return (
            <div style={divStyle}>
                <div className="from-group">
                    <div style={secDivStyle}>
                        <label>Тэмдэглэл</label>
                    </div>
                    <div>
                        <input type="text" style={inputStyle} onChange={this.props.handler} value={this.props.text} />
                    </div>
                </div>
            </div>
        );
    }
}

export default EventForm;