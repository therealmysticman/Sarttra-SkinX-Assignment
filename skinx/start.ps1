Write-Host "Starting SkinX application..." -ForegroundColor Green
Write-Host "Using SQLite database for backend storage" -ForegroundColor Yellow

# Start backend first to ensure database is initialized
Write-Host "Starting backend server..." -ForegroundColor Cyan
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd backend; npm install; npm start"

# Wait a moment for backend to initialize
Start-Sleep -Seconds 3

# Start frontend
Write-Host "Starting frontend server..." -ForegroundColor Cyan
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd frontend; npm install; npm start"

Write-Host "SkinX application started!" -ForegroundColor Green
Write-Host "Frontend: http://localhost:5173" -ForegroundColor Cyan
Write-Host "Backend: http://localhost:5000" -ForegroundColor Cyan
Write-Host "Note: First startup may take longer as data is imported from posts.json to SQLite" -ForegroundColor Yellow