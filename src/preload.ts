import { contextBridge } from 'electron';
import { execSync } from 'child_process';
import buildJSONFromCommandLineOutput from './stringUtil';

function exposeMachineStatistics(): void {
  const hostNameOutput = execSync('hostnamectl', { encoding: 'utf-8' });
  const lscpuOutput = execSync('lscpu', { encoding: 'utf-8' });
  const ipv4Address = execSync('hostname -I', { encoding: 'utf-8' });
  // eslint-disable-next-line operator-linebreak
  const ipv6Command =
    "ip addr | grep inet6 | grep -vwE '(host)' | awk '{print $2;}' | tr -d '\r\n'";
  const ipv6Address = execSync(ipv6Command, { encoding: 'utf-8' });
  // TODO: Investigate using 'process'object values here as well
  const hostNameMap = buildJSONFromCommandLineOutput(hostNameOutput);
  const lscpuMap = buildJSONFromCommandLineOutput(lscpuOutput);
  contextBridge.exposeInMainWorld('api', {
    hostNameMap,
    ipv4Address,
    ipv6Address,
    lscpuMap,
  });
}

exposeMachineStatistics();
