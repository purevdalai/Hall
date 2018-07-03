import axios from 'axios';

const ROOT_URL = 'http://localhost:3001';

function getEvents(event) {
  axios.post(
    ROOT_URL+'/edit',
    // { event: JSON.stringify(event) },
    { event: event },
    { headers: { 'Content-Type': 'application/json' } }
  );
}


export default getEvents;