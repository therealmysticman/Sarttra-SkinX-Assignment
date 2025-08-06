# SkinX Blog Backend

The backend portion of the SkinX blog application built with Express.js and SQLite.

## Features

- RESTful API for blog post retrieval
- SQLite database integration
- Data seeding from JSON file
- Tag-based filtering system
- Efficient database queries with proper error handling

## Tech Stack

- Express.js for API development
- SQLite for database
- Node.js runtime environment

## Project Structure

```
backend/
├── database/             # Database files
│   ├── database.js       # Database connection setup
│   ├── model.js          # Data models and operations
│   └── posts.json        # Seed data
├── server/               # Server files
│   ├── server.js         # Express server setup
└── package.json          # Backend dependencies
```

## API Endpoints

- `GET /api/posts` - Get all posts
- `GET /api/posts/:id` - Get a specific post by ID
- `GET /api/posts/tag/:tag` - Get posts by tag

## Database Schema

### Posts Table
- `id` (TEXT): Unique identifier for the post
- `title` (TEXT): Post title
- `content` (TEXT): Post content (HTML supported)
- `postedAt` (TEXT): ISO timestamp of when the post was created
- `postedBy` (TEXT): Author of the post

### Post_Tags Table
- `post_id` (TEXT): Foreign key reference to posts.id
- `tag` (TEXT): Tag name
- Primary key is the combination of post_id and tag

## Getting Started

1. Install dependencies:
   ```
   npm install
   ```

2. Start the server:
   ```
   npm start
   ```

The server will start on port 5000 by default. You can change this by setting the PORT environment variable.

## Data Seeding

The application automatically seeds the database from the `posts.json` file if the database is empty. This process:

1. Checks if the posts table is empty
2. If empty, reads data from posts.json
3. Inserts posts and their associated tags into the database

## Database Model

The `model.js` file implements the PostModel class that provides the following methods:

- `getAllPosts()`: Retrieves all posts with their tags
- `getPostById(id)`: Gets a specific post by ID
- `getPostsByTag(tag)`: Filters posts by a specific tag

## MVC Architecture

The backend follows the Model-View-Controller (MVC) architecture:

- **Model** (model.js): Handles data access and business logic
- **Controller** (server.js): Manages HTTP requests and responses
- **View**: Not applicable in this API-only backend

The Model connects to the database because:
1. It provides separation of concerns
2. It abstracts database access details from the controller
3. It reduces code duplication by centralizing data access logic

## Error Handling

The API implements proper error handling:

- Appropriate HTTP status codes (404 for not found, 500 for server errors)
- Descriptive error messages
- Promise-based error handling for asynchronous operations

## Development

To run the server in development mode with automatic restarts:

```
npm run dev
```

This requires nodemon to be installed globally or as a dev dependency.
