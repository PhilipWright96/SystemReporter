import { execSync } from 'child_process';
import { buildJSONFromCommandLineOutput } from '../util/stringParseUtil';
import { getStorageType } from './getStorageType';
import { getTotalDiskCapacity } from './getTotalDiskCapacity';

import { setMapValuesToNewMeasurement } from '../util/memoryUnitUtil';

function getMemoryInformation() {
  const ramMemoryInfo = execSync('cat /proc/meminfo', { encoding: 'utf-8' });

  const memoryMap = setMapValuesToNewMeasurement(
    buildJSONFromCommandLineOutput(ramMemoryInfo, ['MemTotal', 'MemAvailable'])
  );

  memoryMap.PersistentStorageType = getStorageType();

  memoryMap.TotalDiskCapacity = getTotalDiskCapacity();

  return memoryMap;
}

export { getMemoryInformation };
