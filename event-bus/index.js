const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());

const events = [];

app.post('/events', (req, res) => {
  const event = req.body;

  events.push(event);

  // this is just a poor man's version of event'ing for Proof of Concept

  axios.post('http://posts-clusterip-serv:8000/events', event); // post
  axios.post('http://comments-serv:8001/events', event); // comments
  axios.post('http://query-serv:8002/events', event); // query
  axios.post('http://moderation-serv:8003/events', event); // moderation

  res.send({ status: 'OK' });
});

app.get('/events', (req, res) => {
  res.send(events);
});

const PORT = 8005;
app.listen(PORT, () => console.log(`Listening on ${PORT}`));
