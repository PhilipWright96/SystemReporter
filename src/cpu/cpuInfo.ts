import { execSync } from 'child_process';
import { buildJSONFromCommandLineOutput } from '../util/stringParseUtil';

function getCPUInformation() {
  const lscpuOutput = execSync('lscpu', { encoding: 'utf-8' });
  return buildJSONFromCommandLineOutput(lscpuOutput, [
    'Architecture',
    'CPUs',
    'CPUminMHz',
    'CPUmaxMHz',
    'Modelname',
    'VendorID',
  ]);
}

export { getCPUInformation };
