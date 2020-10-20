const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());

app.post('/events', (req, res) => {
  const event = req.body;

  // this is just a poor man's version of eventing for Proof of Concept
  axios.post('http://localhost:8000/events', event);
  axios.post('http://localhost:8001/events', event);
  axios.post('http://localhost:8002/events', event);
  axios.post('http://localhost:8003/events', event);

  res.send({ status: 'OK' });
});

const PORT = 8005;
app.listen(PORT, () => console.log(`Listening on ${PORT}`));
