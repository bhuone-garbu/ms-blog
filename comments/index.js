const express = require('express');
const { randomBytes } = require('crypto');
const bodyParser = require('body-parser')

const app = express();
app.use(bodyParser.json());

const commentsByPostId = {};

app.get('/posts/:id/comments', (req, res) => {
  res.send(commentsByPostId[req.params.id] || []);
});

app.post('/posts/:id/comments', (req, res) => {
  const id = randomBytes(4).toString('hex');
  const { content } = req.body;

  const comments = commentsByPostId[req.params.id] || [];
  comments.push({ id, content});
  commentsByPostId[req.params.id] = comments;
  
  commentsByPostId[id] = {
    id, content
  }

  res.status(201).send(comments);
});

app.listen(8001, () => console.log('Listening on 8001'));
