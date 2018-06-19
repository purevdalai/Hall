import React, { Component } from 'react';
import './App.css';
import getEvents from './actions/getEvents'; 

class App extends Component {

  constructor() {
    super();
    this.state = {events:[{}]};
  }

  handler = function(res) {
    this.setState({events: res.data.event});
  }

  componentDidMount() {
    getEvents(this.handler.bind(this));
  }

  render() {
    console.log(this.state.events);
    return (
      <div className="App">
      </div>
    );
  }
}

export default App;
