import axios from 'axios';

const ROOT_URL = 'http://localhost:3001';

function getEvents(newEvent) {
  axios.post(
    ROOT_URL+'/push',
    // { event: JSON.stringify(event) },
    { event: newEvent },
    { headers: { 'Content-Type': 'application/json' } }
  );
}


export default getEvents;