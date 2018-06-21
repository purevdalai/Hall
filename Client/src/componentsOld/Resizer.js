import React, {Component} from 'react';

class Resizer extends Component {

    onMouseDown(e) {
        // console.log("Resizer.onMouseDown");
        // resize fileld dr darsan ba DropArea.js file ruu id bolon true gsn 2 param damjulj bn
        this.props.updateStateResizing(true);
        this.props.updateStateHeight( parseInt(e.clientY) );
    }

    render() {
        return (
            <div className="resizer" 
                onMouseDown={this.onMouseDown.bind(this)}
                >
            </div> 
        );
    }
}

export default Resizer;