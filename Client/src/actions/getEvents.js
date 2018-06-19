import React from 'react';
import axios from 'axios';

const ROOT_URL = 'http://localhost:3001';

function getEvents(handler) {
    axios.get(ROOT_URL + '/events')
      .then(handler);
}

export default getEvents;