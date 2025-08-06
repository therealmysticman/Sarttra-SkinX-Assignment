# SkinX Blog Frontend

The frontend portion of the SkinX blog application built with React and Vite.

## Features

- User authentication (login/logout)
- View and browse blog posts
- Advanced search functionality (search by title, content, or author)
- Filter posts by tags with interactive tag selection
- Pagination for post listings
- Animated background effects
- Responsive design for all screen sizes

## Tech Stack

- React 19 with Hooks
- Vite for development and building
- CSS for styling (component-based CSS architecture)

## Project Structure

```
frontend/
├── src/
│   ├── assets/            # Images and static assets
│   ├── components/        # Reusable UI components
│   │   └── styles/        # Component-specific styles
│   ├── pages/             # Page components
│   │   └── styles/        # Page-specific styles
│   ├── App.jsx            # Main application component
│   └── main.jsx          # Entry point
├── public/                # Static files
├── index.html            # HTML template
└── package.json          # Frontend dependencies
```

## Component Overview

- **App.jsx**: Main application component that handles routing between pages
- **LoginPage**: Handles user authentication with animated background
- **PostListPage**: Displays list of posts with filtering and pagination
- **PostDetailPage**: Shows detailed view of a single post
- **Header**: Navigation header with logo and styled logout button
- **FilterByTag**: Component for searching and filtering posts
- **TagList**: Dropdown component for selecting tags with checkboxes
- **Pagination**: Handles page navigation for post listings
- **PostsList**: Renders the list of post previews
- **Button**: Reusable button component

## Getting Started

1. Install dependencies:
   ```
   npm install
   ```

2. Start the development server:
   ```
   npm run dev
   ```

3. Open your browser and navigate to `http://localhost:5173`

## Building for Production

```
npm run build
```

This will create a `dist` folder with optimized production build.

## Styling

The application uses a component-based CSS approach:
- Each component has its own CSS file in the `styles` folder
- Global styles are defined in `index.css`
- Animated background is implemented in `CommonBackground.css`
- Custom styling for UI elements like checkboxes and buttons

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