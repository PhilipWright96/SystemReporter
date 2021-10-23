import { contextBridge } from 'electron';
import { cpus } from 'os';
import { execSync } from 'child_process';
import buildJSONFromCommandLineOutput from './stringUtil';

function main(): void {
  const hostNameOutput = execSync('hostnamectl', { encoding: 'utf-8' });
  // TODO: Investigate using 'process'object values here as well
  const hostNameMap = buildJSONFromCommandLineOutput(hostNameOutput);

  contextBridge.exposeInMainWorld('api', {
    hostNameMap,
    threads: cpus().length,
  });
}

main();
