import { execSync } from 'child_process';
import {
  buildJSONFromCommandLineOutput,
  getFileSystemSizeInfo,
} from '../util/stringParseUtil';

import { setMapValuesToNewMeasurement } from '../util/memoryUnitUtil';

function getMemoryInformation() {
  const ramMemoryInfo = execSync('cat /proc/meminfo', { encoding: 'utf-8' });

  const memoryMap = setMapValuesToNewMeasurement(
    buildJSONFromCommandLineOutput(ramMemoryInfo, ['MemTotal', 'MemAvailable'])
  );

  setStorageType(memoryMap);

  setTotalDiskCapacity(memoryMap);

  return memoryMap;
}

function setStorageType(memoryMap: Record<string, any>) {
  const isHardDrive = execSync('cat /sys/block/sda/queue/rotational', {
    encoding: 'utf-8',
  });
  memoryMap.PersistantStorageType =
    parseInt(isHardDrive) == 0 ? 'Solid State Drive' : 'Hard Drive';
}

function setTotalDiskCapacity(memoryMap: Record<string, any>) {
  const persistantMemoryInfo = execSync('df -H --output=source,size', {
    encoding: 'utf-8',
  });
  const fileSystemToSizeInMB = getFileSystemSizeInfo(persistantMemoryInfo);
  let totalSizeOfDriveSpace = 0;

  Object.entries(fileSystemToSizeInMB).forEach((entry) => {
    const fileSystem = entry[0],
      size = entry[1];
    if (fileSystem.includes('dev/sda')) {
      totalSizeOfDriveSpace += size;
    }
  });

  memoryMap.TotalDiskCapacity = `${totalSizeOfDriveSpace} MB`;
}

export { getMemoryInformation };
