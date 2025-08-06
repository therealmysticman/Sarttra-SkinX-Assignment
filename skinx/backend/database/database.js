const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const path = require('path');

// Path to database and JSON file
const dbPath = path.join(__dirname, 'posts.db');
const jsonPath = path.join(__dirname, 'posts.json');

// Initialize database
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
  } else {
    console.log('Connected to the SQLite database.');
    initializeDatabase();
  }
});

// Create posts table if it doesn't exist
function initializeDatabase() {
  db.run(`
    CREATE TABLE IF NOT EXISTS posts (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      content TEXT NOT NULL,
      postedAt TEXT NOT NULL,
      postedBy TEXT NOT NULL
    )
  `, (err) => {
    if (err) {
      console.error('Error creating posts table:', err.message);
    } else {
      console.log('Posts table created or already exists.');
      
      // Create tags table
      db.run(`
        CREATE TABLE IF NOT EXISTS post_tags (
          post_id TEXT NOT NULL,
          tag TEXT NOT NULL,
          PRIMARY KEY (post_id, tag),
          FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE
        )
      `, (err) => {
        if (err) {
          console.error('Error creating post_tags table:', err.message);
        } else {
          console.log('Post_tags table created or already exists.');
          
          // Check if database is empty and import data if needed
          checkAndImportData();
        }
      });
    }
  });
}

// Check if database is empty and import data from JSON if needed
function checkAndImportData() {
  db.get('SELECT COUNT(*) as count FROM posts', (err, row) => {
    if (err) {
      console.error('Error checking posts count:', err.message);
      return;
    }
    
    if (row.count === 0) {
      console.log('Database is empty. Importing data from JSON...');
      importDataFromJson();
    } else {
      console.log(`Database already contains ${row.count} posts. Skipping import.`);
    }
  });
}

// Import data from JSON file
function importDataFromJson() {
  try {
    // Read JSON file
    const jsonData = fs.readFileSync(jsonPath, 'utf8');
    const posts = JSON.parse(jsonData);
    
    // Begin transaction
    db.serialize(() => {
      db.run('BEGIN TRANSACTION');
      
      // Prepare statements
      const postStmt = db.prepare('INSERT INTO posts (id, title, content, postedAt, postedBy) VALUES (?, ?, ?, ?, ?)');
      const tagStmt = db.prepare('INSERT INTO post_tags (post_id, tag) VALUES (?, ?)');
      
      // Insert each post and its tags
      let counter = 0;
      posts.forEach(post => {
        // Generate unique ID for each post
        const id = Date.now().toString() + (counter++).toString();
        
        postStmt.run(
          id,
          post.title,
          post.content,
          post.postedAt || new Date().toISOString(),
          post.postedBy || 'Anonymous'
        );
        
        // Insert tags if they exist
        if (post.tags && Array.isArray(post.tags)) {
          post.tags.forEach(tag => {
            tagStmt.run(id, tag);
          });
        }
      });
      
      // Finalize statements
      postStmt.finalize();
      tagStmt.finalize();
      
      // Commit transaction
      db.run('COMMIT', (err) => {
        if (err) {
          console.error('Error committing transaction:', err.message);
        } else {
          console.log(`Successfully imported ${posts.length} posts from JSON.`);
        }
      });
    });
  } catch (error) {
    console.error('Error importing data from JSON:', error);
    db.run('ROLLBACK');
  }
}

// Export database instance
module.exports = db;