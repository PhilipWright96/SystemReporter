import { execSync } from 'child_process';

function getMostExpensiveProcessCPUInfo() {
  debugger;
  const retVal = execSync(`ps aux --sort=-c | awk 'NR<=2'`, {
    encoding: 'utf-8',
  });
  const mostExpensiveProcessInfo = retVal
    .split('\n')[1]
    .replace(/ +(?= )/g, '')
    .split(' ');

  const expensiveProcessInfoSummary = {
    processId: mostExpensiveProcessInfo[1],
    cpuUsage: mostExpensiveProcessInfo[2],
    processName: mostExpensiveProcessInfo[10],
  };

  const summaryString = `CPU Usage ${expensiveProcessInfoSummary.cpuUsage}% - Process Id - ${expensiveProcessInfoSummary.processId} `;
  return summaryString;
}

export { getMostExpensiveProcessCPUInfo };
