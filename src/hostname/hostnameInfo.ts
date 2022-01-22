import { execSync } from 'child_process';
import { buildJSONFromCommandLineOutput } from '../util/util';

function getHostNameInformation() {
  const hostNameOutput = execSync('hostnamectl', { encoding: 'utf-8' });
  return buildJSONFromCommandLineOutput(hostNameOutput, ['Statichostname']);
}

export { getHostNameInformation };
