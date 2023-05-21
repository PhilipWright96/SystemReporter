import childProcess from 'child_process';
import { getTotalDiskCapacity } from '../../src/memory/getTotalDiskCapacity';
import * as stringParseUtil from '../../src/util/stringParseUtil';

jest.mock('child_process');

afterEach(() => {
  jest.clearAllMocks();
});

describe('getTotalDiskCapacity', () => {
  it('should return total size of dev/sda file systems', () => {
    // Given
    const fakeCommandLineOutput = 'test',
      fakeFileSystemToSize = Object.freeze({
        'dev/sda': 5,
        'dev/notSda': 10,
      });

    jest
      .spyOn(childProcess, 'execSync')
      .mockReturnValueOnce(Buffer.from(fakeCommandLineOutput, 'utf-8'));

    jest
      .spyOn(stringParseUtil, 'getFileSystemSizeInfo')
      .mockReturnValueOnce(fakeFileSystemToSize);

    // When
    const returnedDiskCapacity = getTotalDiskCapacity();

    // Then
    expect(childProcess.execSync).toHaveBeenCalledTimes(1);
    expect(childProcess.execSync).toHaveBeenCalledWith(
      'df -H --output=source,size',
      {
        encoding: 'utf-8',
      }
    );

    expect(childProcess.execSync).toHaveBeenCalledTimes(1);
    expect(childProcess.execSync).toHaveBeenCalledWith(
      'df -H --output=source,size',
      {
        encoding: 'utf-8',
      }
    );

    expect(stringParseUtil.getFileSystemSizeInfo).toHaveBeenCalledTimes(1);
    expect(stringParseUtil.getFileSystemSizeInfo).toHaveBeenCalledWith(
      Buffer.from(fakeCommandLineOutput, 'utf-8')
    );

    expect(returnedDiskCapacity).toStrictEqual('5 MB');
  });
});
