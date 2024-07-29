const { exec } = require('child_process');

console.log('正在停止 ExpenseLogix 应用...');

// 使用 taskkill 命令强制终止所有 node.exe 进程
exec('taskkill /F /IM node.exe', (error, stdout, stderr) => {
  if (error) {
    console.error(`执行错误: ${error}`);
    return;
  }
  if (stderr) {
    console.error(`命令错误: ${stderr}`);
    return;
  }
  console.log(`操作输出: ${stdout}`);
  console.log('ExpenseLogix 应用已停止');
});