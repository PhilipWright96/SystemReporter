import { execSync } from 'child_process';

function getProcessCount() {
  return execSync('ps -e | wc -l', { encoding: 'utf-8' });
}

export { getProcessCount };
