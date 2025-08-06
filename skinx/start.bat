@echo off
echo Starting SkinX application...
echo Using SQLite database for backend storage

echo Starting backend server...
start cmd /k "cd backend && npm install && npm start"

:: Wait a moment for backend to initialize
timeout /t 3 > nul

echo Starting frontend server...
start cmd /k "cd frontend && npm install && npm start"

echo SkinX application started!
echo Frontend: http://localhost:5173
echo Backend: http://localhost:5000
echo Note: First startup may take longer as data is imported from posts.json to SQLite