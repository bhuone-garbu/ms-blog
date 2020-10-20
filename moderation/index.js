const axios = require('axios');
const app = require('express')();
const bodyParser = require('body-parser');

app.use(bodyParser.json());

app.post('/events', async (req, res) => {
  const { type, data } = req.body;
  const { id, postId, content } = data;

  if (type === 'CommentCreated') {
    const status = data.content.includes('orange') ? 'rejected' : 'approved';
    
    await axios.post('http://localhost:8005/events', {
      type: 'CommentModerated',
      data: {
        id, postId, status, content
      }
    });
  }

  res.send({});

});

const PORT = 8003;
app.listen(PORT, () => console.log(`Listening on ${PORT}`));
