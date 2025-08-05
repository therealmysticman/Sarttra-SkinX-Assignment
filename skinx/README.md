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
├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── main.jsx
│   ├── public/
│   ├── index.html
│   └── package.json
├── backend/
│   ├── database/
│   │   └── posts.json
│   ├── server/
│   │   └── server.js
│   └── package.json
├── start.bat
└── start.ps1
```

## Getting Started

### Option 1: Using the start scripts

1. Run the start script:
   - On Windows: Double-click `start.bat` or run `.\start.ps1` in PowerShell
   
2. Open your browser and navigate to `http://localhost:5173`

### Option 2: Starting manually

1. Start the backend:
   ```
   cd backend
   npm install
   npm start
   ```

2. In a new terminal, start the frontend:
   ```
   cd frontend
   npm install
   npm start
   ```

3. Open your browser and navigate to `http://localhost:5173`

## API Endpoints

- `GET /api/posts` - Get all posts
- `GET /api/posts/:id` - Get a specific post
- `GET /api/posts/tag/:tag` - Get posts by tag
- `POST /api/posts` - Create a new post
- `PUT /api/posts/:id` - Update a post
- `DELETE /api/posts/:id` - Delete a post