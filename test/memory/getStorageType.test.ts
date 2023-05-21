import childProcess from 'child_process';
import { getStorageType } from '../../src/memory/getStorageType';

jest.mock('child_process');

afterEach(() => {
  jest.clearAllMocks();
});

describe('getStorageType', () => {
  it('should return solid state drive when terminal command returns 0', () => {
    // Given
    const terminalCommandOutput = Buffer.from('0', 'utf-8');
    jest
      .spyOn(childProcess, 'execSync')
      .mockReturnValueOnce(terminalCommandOutput);

    // When
    const returnedStorageType = getStorageType();

    // Then
    expect(childProcess.execSync).toHaveBeenCalledTimes(1);
    expect(childProcess.execSync).toHaveBeenCalledWith(
      'cat /sys/block/sda/queue/rotational',
      {
        encoding: 'utf-8',
      }
    );

    expect(returnedStorageType).toStrictEqual('Solid State Drive');
  });

  it('should return solid state drive when terminal command returns 1', () => {
    // Given
    const terminalCommandOutput = Buffer.from('1', 'utf-8');
    jest
      .spyOn(childProcess, 'execSync')
      .mockReturnValueOnce(terminalCommandOutput);

    // When
    const returnedStorageType = getStorageType();

    // Then
    expect(childProcess.execSync).toHaveBeenCalledTimes(1);
    expect(childProcess.execSync).toHaveBeenCalledWith(
      'cat /sys/block/sda/queue/rotational',
      {
        encoding: 'utf-8',
      }
    );

    expect(returnedStorageType).toStrictEqual('Hard Drive');
  });
});
