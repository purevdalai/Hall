import React, { Component } from 'react';
import Schedule from './Schedule';
import getEvents from './../actions/getEvents'; 
import './../styles/AppOld.css';

class App extends Component {

  constructor() {
    super();
    this.state = {events:[{}] , times: [], week: []};
  }

  handler = function(res) {
    this.setState({events: res.data.event});
  }

  componentDidMount() {
    getEvents(this.handler.bind(this));
    this.setState({
      times: ['09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '12:00',
              '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30',
              '16:00', '16:30', '17:00', '17:30', '18:00'],
      week: ['Даваа', 'Мягмар', 'Лхагва', 'Пүрэв', 'Баасан', 'Бямба', 'Ням']});
  }

  render() {
    let events = this.state.events;
    const times = this.state.times;
    const week = this.state.week;

    return (
      <div className="container cd-schedule">
        <Schedule events={events} times={times} week={week} />
      </div>
    );
  }
}

export default App;
