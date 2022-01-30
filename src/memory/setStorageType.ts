import { execSync } from 'child_process';

function setStorageType() {
  const isHardDrive = execSync('cat /sys/block/sda/queue/rotational', {
    encoding: 'utf-8',
  });
  return parseInt(isHardDrive) == 0 ? 'Solid State Drive' : 'Hard Drive';
}

export { setStorageType };
