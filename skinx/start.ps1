Write-Host "Starting SkinX application..." -ForegroundColor Green

# Start frontend
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd frontend; npm install; npm start"

# Start backend
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd backend; npm install; npm start"

Write-Host "SkinX application started!" -ForegroundColor Green
Write-Host "Frontend: http://localhost:5173" -ForegroundColor Cyan
Write-Host "Backend: http://localhost:5000" -ForegroundColor Cyan