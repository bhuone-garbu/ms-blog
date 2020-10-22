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

  const newComment = { id, content, status : 'pending' };
  comments.push(newComment);

  commentsByPostId[req.params.id] = comments;

  await axios.post('http://event-bus-serv:8005/events', {
    type: 'CommentCreated',
    data: {
      ...newComment, postId: req.params.id
    }
  });

  res.status(201).send(comments);
});

app.post('/events', async (req, res) => {
  console.log('Received event: ', req.body.type);

  const { type, data } = req.body;

  if (type === 'CommentModerated') {
    const { postId, id, status, content } = data;

    const comments = commentsByPostId[postId];

    const targetComment = comments.find(comment => comment.id === id);
    targetComment.status = status;

    await axios.post('http://event-bus-serv:8005/events', {
      type: 'CommentUpdated',
      data: {
        id, status, postId, content
      }
    });
  }

  res.send({});
});

const PORT = 8001;
app.listen(PORT, () => console.log(`Listening on ${PORT}`));
