import axios from 'axios';

const ROOT_URL = 'http://localhost:3001';

function getEvents(handler) {
    axios.get(ROOT_URL + '/event')
      .then(handler);
}

export default getEvents;