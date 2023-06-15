import { getProcessCount } from './getProcessCount';
import { getMostExpensiveProcessCPUInfo } from './getMostExpensiveProcessCPUInfo';

function getProcessInformation() {
  const processCount = getProcessCount();
  const mostExpensiveProcessInfo = getMostExpensiveProcessCPUInfo();
  return Object.freeze({
    processCount,
    mostExpensiveProcessInfo,
  });
}

export { getProcessInformation };
