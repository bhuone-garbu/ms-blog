const express = require('express');
const { randomBytes } = require('crypto');
const bodyParser = require('body-parser')
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

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

const PORT = 8001;
app.listen(PORT, () => console.log(`Listening on ${PORT}`));
