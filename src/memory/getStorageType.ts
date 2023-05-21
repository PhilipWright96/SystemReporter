import { execSync } from 'child_process';

function getStorageType() {
  const isHardDrive = execSync('cat /sys/block/sda/queue/rotational', {
    encoding: 'utf-8',
  });
  return parseInt(isHardDrive) == 0 ? 'Solid State Drive' : 'Hard Drive';
}

export { getStorageType };
