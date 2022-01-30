import { execSync } from 'child_process';
import { buildJSONFromCommandLineOutput } from '../util/stringParseUtil';
import { setStorageType } from './setStorageType';
import { setTotalDiskCapacity } from './setTotalDiskCapacity';

import { setMapValuesToNewMeasurement } from '../util/memoryUnitUtil';

function getMemoryInformation() {
  const ramMemoryInfo = execSync('cat /proc/meminfo', { encoding: 'utf-8' });

  const memoryMap = setMapValuesToNewMeasurement(
    buildJSONFromCommandLineOutput(ramMemoryInfo, ['MemTotal', 'MemAvailable'])
  );

  memoryMap.PersistentStorageType = setStorageType();

  memoryMap.TotalDiskCapacity = setTotalDiskCapacity();

  return memoryMap;
}

export { getMemoryInformation };
