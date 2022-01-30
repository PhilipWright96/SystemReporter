import { execSync } from 'child_process';
import { getFileSystemSizeInfo } from '../util/stringParseUtil';

function setTotalDiskCapacity() {
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

  return `${totalSizeOfDriveSpace} MB`;
}

export { setTotalDiskCapacity };
