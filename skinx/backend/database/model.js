const db = require('./database');

// Post model class
class PostModel {
  constructor() {
    // No need to load posts on initialization as SQLite handles this
  }

  // Get all posts
  getAllPosts() {
    return new Promise((resolve, reject) => {
      const query = `
        SELECT p.id, p.title, p.content, p.postedAt, p.postedBy, GROUP_CONCAT(pt.tag) as tags
        FROM posts p
        LEFT JOIN post_tags pt ON p.id = pt.post_id
        GROUP BY p.id
        ORDER BY p.postedAt DESC
      `;
      
      db.all(query, [], (err, rows) => {
        if (err) {
          console.error('Error fetching posts:', err.message);
          reject(err);
          return;
        }
        
        // Process rows to format tags as arrays
        const posts = rows.map(row => ({
          ...row,
          tags: row.tags ? row.tags.split(',') : []
        }));
        
        resolve(posts);
      });
    });
  }

  // Get a single post by ID
  getPostById(id) {
    return new Promise((resolve, reject) => {
      const query = `
        SELECT p.id, p.title, p.content, p.postedAt, p.postedBy, GROUP_CONCAT(pt.tag) as tags
        FROM posts p
        LEFT JOIN post_tags pt ON p.id = pt.post_id
        WHERE p.id = ?
        GROUP BY p.id
      `;
      
      db.get(query, [id], (err, row) => {
        if (err) {
          console.error('Error fetching post by ID:', err.message);
          reject(err);
          return;
        }
        
        if (!row) {
          resolve(null);
          return;
        }
        
        // Process row to format tags as array
        const post = {
          ...row,
          tags: row.tags ? row.tags.split(',') : []
        };
        
        resolve(post);
      });
    });
  }

  // Get posts by tag
  getPostsByTag(tag) {
    return new Promise((resolve, reject) => {
      const query = `
        SELECT p.id, p.title, p.content, p.postedAt, p.postedBy, GROUP_CONCAT(pt2.tag) as tags
        FROM posts p
        JOIN post_tags pt ON p.id = pt.post_id AND pt.tag = ?
        LEFT JOIN post_tags pt2 ON p.id = pt2.post_id
        GROUP BY p.id
        ORDER BY p.postedAt DESC
      `;
      
      db.all(query, [tag], (err, rows) => {
        if (err) {
          console.error('Error fetching posts by tag:', err.message);
          reject(err);
          return;
        }
        
        // Process rows to format tags as arrays
        const posts = rows.map(row => ({
          ...row,
          tags: row.tags ? row.tags.split(',') : []
        }));
        
        resolve(posts);
      });
    });
  }
}

module.exports = new PostModel();