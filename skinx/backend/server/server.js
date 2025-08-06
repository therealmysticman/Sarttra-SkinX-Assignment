const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const PostModel = require('../database/model');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
// Get all posts
app.get('/api/posts', (req, res) => {
  PostModel.getAllPosts()
    .then(posts => {
      res.json(posts);
    })
    .catch(err => {
      console.error('Error in GET /api/posts:', err);
      res.status(500).json({ message: 'Server error' });
    });
});

// Get posts by tag
app.get('/api/posts/tag/:tag', (req, res) => {
  const tag = req.params.tag;
  PostModel.getPostsByTag(tag)
    .then(posts => {
      res.json(posts);
    })
    .catch(err => {
      console.error(`Error in GET /api/posts/tag/${tag}:`, err);
      res.status(500).json({ message: 'Server error' });
    });
});

// Get a single post by ID
app.get('/api/posts/:id', (req, res) => {
  const id = req.params.id;
  PostModel.getPostById(id)
    .then(post => {
      if (!post) {
        return res.status(404).json({ message: 'Post not found' });
      }
      res.json(post);
    })
    .catch(err => {
      console.error(`Error in GET /api/posts/${id}:`, err);
      res.status(500).json({ message: 'Server error' });
    });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});