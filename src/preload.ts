import { contextBridge } from 'electron';

import { getCPUInformation } from './cpu/cpuInfo';
import { getHostNameInformation } from './hostname/hostnameInfo';
import { getIPAddressInformation } from './ipaddress/ipaddressInfo';
import { getMemoryInformation } from './memory/memoryInfo';

function exposeMachineStatistics(): void {
  // TODO: Investigate using 'process'object values here as well
  const cpuInformation = getCPUInformation(),
    hostNameInformation = getHostNameInformation(),
    idAddressInformation = getIPAddressInformation(),
    memoryInformation = getMemoryInformation();

  contextBridge.exposeInMainWorld('api', {
    cpuInformation,
    hostNameInformation,
    idAddressInformation,
    memoryInformation,
  });
}

exposeMachineStatistics();
