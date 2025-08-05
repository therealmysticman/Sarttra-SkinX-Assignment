import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Start backend server
const server = spawn('node', ['server.js'], {
  cwd: join(__dirname),
  stdio: 'inherit'
});

console.log('Backend server started on port 5000');

// Handle server process events
server.on('error', (error) => {
  console.error(`Backend server error: ${error.message}`);
});

server.on('close', (code) => {
  console.log(`Backend server exited with code ${code}`);
});

// Keep the process running
process.on('SIGINT', () => {
  console.log('Stopping servers...');
  server.kill();
  process.exit();
});