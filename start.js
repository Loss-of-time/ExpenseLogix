const { spawn } = require('child_process');
const path = require('path');

const backendPath = path.join(__dirname, 'backend');
const frontendPath = path.join(__dirname, 'frontend');

// 启动后端
const backendProcess = spawn('cmd.exe', ['/c', 'npm', 'run', 'start'], {
  cwd: backendPath,
  stdio: 'pipe',
  shell: false,
  windowsHide: true
});

backendProcess.stdout.on('data', (data) => {
  console.log(`后端输出: ${data}`);
});

backendProcess.stderr.on('data', (data) => {
  console.error(`后端错误: ${data}`);
});

// 前端构建并启动
const frontendProcess = spawn('cmd.exe', ['/c', 'npx next build && npx next start -p 3001'], {
  cwd: frontendPath,
  stdio: 'pipe',
  shell: false,
  windowsHide: true
});

frontendProcess.stdout.on('data', (data) => {
  console.log(`前端输出: ${data}`);
});

frontendProcess.stderr.on('data', (data) => {
  console.error(`前端错误: ${data}`);
});