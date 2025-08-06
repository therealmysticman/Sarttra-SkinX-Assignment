# SkinX Blog Application

A fullstack blog application built with React and Node.js, featuring an animated background, advanced search functionality, and responsive design.

## Features

- User authentication (login/logout)
- View and browse blog posts
- Advanced search functionality (search by title, content, or author)
- Filter posts by tags with interactive tag selection
- Pagination for post listings
- Animated background effects
- Responsive design for all screen sizes
- SQLite database with JSON data seeding

## Tech Stack

- **Frontend**: 
  - React 19 with Hooks
  - Vite for fast development and building
  - CSS for styling (component-based CSS architecture)

- **Backend**: 
  - Express.js for RESTful API
  - SQLite for database
  - JSON file for initial data seeding

## Project Structure

```
skinx/
├── frontend/                  # React frontend application
│   ├── src/
│   │   ├── assets/            # Images and static assets
│   │   ├── components/        # Reusable UI components
│   │   │   └── styles/        # Component-specific styles
│   │   ├── pages/             # Page components
│   │   │   └── styles/        # Page-specific styles
│   │   ├── App.jsx            # Main application component
│   │   └── main.jsx          # Entry point
│   ├── public/                # Static files
│   ├── index.html            # HTML template
│   └── package.json          # Frontend dependencies
├── backend/                   # Node.js backend
│   ├── database/             # Database files
│   │   ├── database.js       # Database connection setup
│   │   ├── model.js          # Data models and operations
│   │   ├── posts.db          # SQLite database file
│   │   └── posts.json        # Seed data
│   ├── server/               # Server files
│   │   ├── server.js         # Express server setup
│   │   └── start.js          # Server entry point
│   └── package.json          # Backend dependencies
├── start.bat                 # Windows batch startup script
└── start.ps1                 # PowerShell startup script
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

## Login Instructions

The application uses a simple mock authentication system:
- Enter any username and password to log in
- Click the logout button in the header to log out

## API Endpoints

- `GET /api/posts` - Get all posts
- `GET /api/posts/:id` - Get a specific post
- `GET /api/posts/tag/:tag` - Get posts by tag

## Features Implemented

1. **Animated Background**
   - Gradient circles with animations
   - Consistent across all pages

2. **Responsive Design**
   - Mobile-friendly layout
   - Adaptive pagination for different screen sizes
   - Styled elements including rounded logout button

3. **Advanced Search & Filtering**
   - Search by title, content, or author
   - Tag filtering with interactive checkbox selection
   - Combined search and tag filtering with button click
   - Clear visual feedback on selected filters

4. **User Interface Improvements**
   - Intuitive search bar with integrated tag filtering
   - Custom-styled checkboxes for tag selection
   - Responsive controls that adapt to different screen sizes

5. **Post Detail View**
   - Clean layout for reading posts
   - Tag navigation

6. **Database Integration**
   - SQLite database with proper data models
   - JSON seeding for initial data
   - MVC architecture with separation of concerns

## Search Functionality

The application features a powerful search system that allows users to:

1. **Search by multiple fields**:
   - Post titles
   - Post content
   - Author names

2. **Filter by tags**:
   - Click the "Tags" button to see available tags
   - Select multiple tags using checkboxes
   - Click Search to apply both text search and tag filters

3. **Combined searching**:
   - Use text search and tag filters together
   - Results will match both text criteria AND selected tags

4. **User experience**:
   - Press Enter in the search field to execute search
   - Clear visual feedback showing how many tags are selected
   - Search button text updates based on selection state