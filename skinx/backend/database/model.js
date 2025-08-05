const fs = require('fs');
const path = require('path');

// Path to posts.json file
const postsFilePath = path.join(__dirname, 'posts.json');

// Post model class
class PostModel {
  constructor() {
    this.posts = this.loadPosts();
  }

  // Load posts from JSON file
  loadPosts() {
    try {
      const data = fs.readFileSync(postsFilePath);
      return JSON.parse(data);
    } catch (error) {
      console.error('Error reading posts file:', error);
      return [];
    }
  }

  // Save posts to JSON file
  savePosts() {
    try {
      fs.writeFileSync(postsFilePath, JSON.stringify(this.posts, null, 2));
      return true;
    } catch (error) {
      console.error('Error writing posts file:', error);
      return false;
    }
  }

  // Get all posts
  getAllPosts() {
    return this.posts;
  }

  // Get post by ID
  getPostById(id) {
    return this.posts.find(post => post.id === id);
  }

  // Get posts by tag
  getPostsByTag(tag) {
    return this.posts.filter(post => post.tags && post.tags.includes(tag));
  }

  // Create a new post
  createPost(postData) {
    const newPost = {
      id: Date.now().toString(),
      title: postData.title,
      content: postData.content,
      postedAt: new Date().toISOString(),
      postedBy: postData.postedBy || 'Anonymous',
      tags: postData.tags || []
    };
    
    this.posts.push(newPost);
    this.savePosts();
    
    return newPost;
  }

  // Update an existing post
  updatePost(id, postData) {
    const postIndex = this.posts.findIndex(post => post.id === id);
    
    if (postIndex === -1) {
      return null;
    }
    
    const updatedPost = {
      ...this.posts[postIndex],
      title: postData.title || this.posts[postIndex].title,
      content: postData.content || this.posts[postIndex].content,
      tags: postData.tags || this.posts[postIndex].tags
    };
    
    this.posts[postIndex] = updatedPost;
    this.savePosts();
    
    return updatedPost;
  }

  // Delete a post
  deletePost(id) {
    const initialLength = this.posts.length;
    this.posts = this.posts.filter(post => post.id !== id);
    
    if (this.posts.length === initialLength) {
      return false;
    }
    
    this.savePosts();
    return true;
  }
}

module.exports = new PostModel();