const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const posts = {}

const handlePosts = (type, data) => {
  if (type === 'PostCreated') {
    const { id, title } = data;
    posts[id] = { id, title, comments: [] }
  }

  if (type === 'CommentCreated') {
    const { id, content, postId, status } = data;
    const post = posts[postId];
    post.comments.push({ id, content, status });
  }

  if (type === 'CommentUpdated') {
    const { id, content, postId, status } = data;

    const targetPost = posts[postId];

    const targetComment = targetPost.comments.find(comment => comment.id === id);
    targetComment.status = status;
    targetComment.content = content;
  }
}

app.get('/posts', (req, res) => {
  res.send(posts);
});

app.post('/events', (req, res) => {
  const { type, data } = req.body;

  handlePosts(type, data);

  res.send({});
});

const PORT = 8002;
app.listen(PORT, async () => {
  console.log(`Listening on ${PORT}`)

  const res = await axios.get('http://localhost:8005/events');

  for (let event of res.data) {
    console.log('Processing event: ', event.type);

    handlePosts(event.type, event.data);
  }
});
