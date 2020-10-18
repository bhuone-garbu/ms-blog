const express = require('express');
const { randomBytes } = require('crypto');
const bodyParser = require('body-parser')
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const commentsByPostId = {};

app.get('/posts/:id/comments', (req, res) => {
  res.send(commentsByPostId[req.params.id] || []);
});

app.post('/posts/:id/comments', async (req, res) => {
  const id = randomBytes(4).toString('hex');
  const { content } = req.body;

  const comments = commentsByPostId[req.params.id] || [];
  comments.push({ id, content });
  commentsByPostId[req.params.id] = comments;

  await axios.post('http://localhost:8005/events', {
    type: 'CommentCreated',
    data: {
      id, content, postId: req.params.id
    }
  });

  res.status(201).send(comments);
});

app.post('/events', (req, res) => {
  console.log('Received event: ', req.body.type);
  res.send({});
});

const PORT = 8001;
app.listen(PORT, () => console.log(`Listening on ${PORT}`));
