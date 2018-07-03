import React, { Component } from 'react';
import Schedule from './Schedule';
import getEvents from './../actions/getEvents'; 
import pushEvent from './../actions/pushEvent';
import deleteEvent from './../actions/deleteEvent';
import editEvent from './../actions/editEvent';
import './../styles/App.css';

class App extends Component {

  constructor() {
    super();
    this.state = {events:[{}] , times: [], week: []};
  }

  handler = function(res) {
    this.setState({events: res.data});
  }

  fetchData() {
    getEvents(this.handler.bind(this));
    this.setState({
      times: ['09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '12:00',
              '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30',
              '16:00', '16:30', '17:00', '17:30', '18:00', '18:30', '19:00', '19:30'],
      week: [' ' ,'Даваа', 'Мягмар', 'Лхагва', 'Пүрэв', 'Баасан', 'Бямба', 'Ням']});
  }

  componentDidMount() {
    this.fetchData();
  }

  editEvent(event) {  
    const events = this.state.events;
    const index = events.findIndex(e => e.id == event.id);
    if(index >= 0) {
      events[index] = event;
      this.setState({events:events});
  
      editEvent(event);
    }
  }

  setEndTime(event, endTime) {
    const events = this.state.events;
    const index = events.findIndex(e => e.id == event.id);
    if(index >= 0) {
      events[index].end = endTime;
      this.setState({events:events});
      
      editEvent(event);
    }
  }

  addEvent(event) {
    const events = this.state.events;
    events.push(event);
    this.setState({events:events});

    pushEvent(event);
  }
  
  deleteEvent(event) {
    const events = this.state.events;
    const index = events.indexOf(event);
    delete events[index];
    this.setState({events:events});

    deleteEvent(event);
  }

  render() {
    let events = this.state.events;
    const times = this.state.times;
    const week = this.state.week;

    return (
      <div className="container cd-container">
        <Schedule 
          editEvent={this.editEvent.bind(this)}
          deleteEvent={this.deleteEvent.bind(this)}
          addEvent={this.addEvent.bind(this)}
          setEndTime={this.setEndTime.bind(this)}
          events={events}
          times={times} 
          week={week} />
      </div>  
    );
  }
}

export default App;
