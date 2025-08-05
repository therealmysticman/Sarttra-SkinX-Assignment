# SkinX Blog Application

A fullstack blog application built with React and Node.js.

## Features

- User authentication (login/logout)
- Create, read, update, and delete blog posts
- Filter posts by tags
- Display HTML content in posts
- Responsive design

## Tech Stack

- **Frontend**: React, Vite
- **Backend**: Express.js
- **Database**: JSON file storage

## Project Structure

```
skinx/
├── backend/
│   ├── database/
│   │   └── posts.json
│   └── server/
│       ├── server.js
│       └── start.js
└── src/
    ├── App.jsx
    ├── App.css
    ├── main.jsx
    └── index.css
```

## Getting Started

1. Install dependencies:
   ```
   npm install
   ```

2. Start the development server:
   ```
   npm run start
   ```

3. Open your browser and navigate to `http://localhost:5173`

## API Endpoints

- `GET /api/posts` - Get all posts
- `GET /api/posts/:id` - Get a specific post
- `GET /api/posts/tag/:tag` - Get posts by tag
- `POST /api/posts` - Create a new post
- `PUT /api/posts/:id` - Update a post
- `DELETE /api/posts/:id` - Delete a post