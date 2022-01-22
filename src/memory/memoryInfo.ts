import { execSync } from 'child_process';
import {
  buildJSONFromCommandLineOutput,
  getFileSystemSizeInfo,
  setMapValuesToNewMeasurement,
} from '../util/util';

function getMemoryInformation() {
  const ramMemoryInfo = execSync('cat /proc/meminfo', { encoding: 'utf-8' }),
    isHardDrive = execSync('cat /sys/block/sda/queue/rotational', {
      encoding: 'utf-8',
    }),
    persistantMemoryInfo = execSync('df -H --output=source,size', {
      encoding: 'utf-8',
    });

  const memoryMap = setMapValuesToNewMeasurement(
    buildJSONFromCommandLineOutput(ramMemoryInfo, ['MemTotal', 'MemAvailable'])
  );

  memoryMap.PersistantStorageType =
    parseInt(isHardDrive) == 0 ? 'Solid State Drive' : 'Hard Drive';

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

  return memoryMap;
}

export { getMemoryInformation };
