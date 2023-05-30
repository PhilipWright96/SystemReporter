import { getProcessCount } from './getProcessCount';

function getProcessInformation() {
  const processCount = getProcessCount();
  return Object.freeze({
    processCount,
  });
}

export { getProcessInformation };
