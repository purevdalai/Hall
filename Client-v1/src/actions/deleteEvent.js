import axios from 'axios';

const ROOT_URL = 'http://localhost:3001';

function deleteEvent(event) {
  axios.post(
    ROOT_URL+'/delete',
    { event: event },
    { headers: { 'Content-Type': 'application/json' } }
  );
}


export default deleteEvent;