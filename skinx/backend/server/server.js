import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Path to posts.json file
const postsFilePath = join(__dirname, '../database/posts.json');

// Read posts from JSON file
const getPosts = () => {
  try {
    const data = fs.readFileSync(postsFilePath);
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading posts file:', error);
    return [];
  }
};

// Write posts to JSON file
const savePosts = (posts) => {
  try {
    fs.writeFileSync(postsFilePath, JSON.stringify(posts, null, 2));
  } catch (error) {
    console.error('Error writing posts file:', error);
  }
};

// Routes
// Get all posts
app.get('/api/posts', (req, res) => {
  const posts = getPosts();
  res.json(posts);
});

// Get posts by tag
app.get('/api/posts/tag/:tag', (req, res) => {
  const tag = req.params.tag;
  const posts = getPosts();
  const filteredPosts = posts.filter(post => post.tags && post.tags.includes(tag));
  res.json(filteredPosts);
});

// Get a single post by ID
app.get('/api/posts/:id', (req, res) => {
  const id = req.params.id;
  const posts = getPosts();
  const post = posts.find(p => p.id === id);
  
  if (!post) {
    return res.status(404).json({ message: 'Post not found' });
  }
  
  res.json(post);
});

// Create a new post
app.post('/api/posts', (req, res) => {
  const posts = getPosts();
  const newPost = {
    id: Date.now().toString(),
    title: req.body.title,
    content: req.body.content,
    postedAt: new Date().toISOString(),
    postedBy: req.body.postedBy || 'Anonymous',
    tags: req.body.tags || []
  };
  
  posts.push(newPost);
  savePosts(posts);
  
  res.status(201).json(newPost);
});

// Update a post
app.put('/api/posts/:id', (req, res) => {
  const id = req.params.id;
  const posts = getPosts();
  const postIndex = posts.findIndex(p => p.id === id);
  
  if (postIndex === -1) {
    return res.status(404).json({ message: 'Post not found' });
  }
  
  const updatedPost = {
    ...posts[postIndex],
    title: req.body.title || posts[postIndex].title,
    content: req.body.content || posts[postIndex].content,
    tags: req.body.tags || posts[postIndex].tags
  };
  
  posts[postIndex] = updatedPost;
  savePosts(posts);
  
  res.json(updatedPost);
});

// Delete a post
app.delete('/api/posts/:id', (req, res) => {
  const id = req.params.id;
  const posts = getPosts();
  const filteredPosts = posts.filter(p => p.id !== id);
  
  if (filteredPosts.length === posts.length) {
    return res.status(404).json({ message: 'Post not found' });
  }
  
  savePosts(filteredPosts);
  res.json({ message: 'Post deleted successfully' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});