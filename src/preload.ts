import { contextBridge } from 'electron';
import { execSync } from 'child_process';
import buildJSONFromCommandLineOutput from './util';

function exposeMachineStatistics(): void {
  const hostNameOutput = execSync('hostnamectl', { encoding: 'utf-8' }),
    lscpuOutput = execSync('lscpu', { encoding: 'utf-8' }),
    privateIpv4Address = execSync('hostname -I', { encoding: 'utf-8' }),
    publicIpv4Address = execSync('curl ifconfig.me', { encoding: 'utf-8' }),
    ipv6Command =
      "ip addr | grep inet6 | grep -vwE '(host)' | awk '{print $2;}' | tr -d '\r\n'",
    privateIpv6Address = execSync(ipv6Command, { encoding: 'utf-8' });

  // TODO: Investigate using 'process'object values here as well
  const hostNameMap = buildJSONFromCommandLineOutput(hostNameOutput, [
      'Statichostname',
    ]),
    lscpuMap = buildJSONFromCommandLineOutput(lscpuOutput, [
      'Architecture',
      'CPUs',
      'CPUminMHz',
      'CPUmaxMHz',
      'Modelname',
      'VendorID',
    ]),
    ipAddressMap = Object.freeze({
      privateIpv4Address,
      publicIpv4Address,
      privateIpv6Address,
    });
  contextBridge.exposeInMainWorld('api', {
    hostNameMap,
    ipAddressMap,
    lscpuMap,
  });
}

exposeMachineStatistics();
