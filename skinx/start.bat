@echo off
echo Starting SkinX application...

start cmd /k "cd frontend && npm install && npm start"
start cmd /k "cd backend && npm install && npm start"

echo SkinX application started!
echo Frontend: http://localhost:5173
echo Backend: http://localhost:5000