import childProcess from 'child_process';
import { getMemoryInformation } from '../../src/memory/memoryInfo';
import * as getStorageType from '../../src/memory/getStorageType';
import * as getTotalDiskCapacity from '../../src/memory/getTotalDiskCapacity';
import * as stringParseUtil from '../../src/util/stringParseUtil';
import * as memoryUnitUtil from '../../src/util/memoryUnitUtil';

jest.mock('../../src/util/stringParseUtil');
jest.mock('../../src/util/memoryUnitUtil');
jest.mock('../../src/memory/getStorageType');
jest.mock('../../src/memory/getTotalDiskCapacity');

jest.mock('child_process');

describe('getMemoryInformation', () => {
  it('should construct memory map and set both storage type and disk capacity', () => {
    // Given
    const fakeJSONOutput = { fakeProperty: 'fake value' },
      fakeNewMeasurementOutput = { anotherFakeProperty: 'another fake value' },
      fakeMemInfoOutput = Buffer.from('Fake meminfo output', 'utf-8'),
      fakeStorageType = 'Solid State Drive',
      fakeDiskCapacity = `99 MB`;

    jest.spyOn(childProcess, 'execSync').mockReturnValue(fakeMemInfoOutput);
    jest
      .spyOn(stringParseUtil, 'buildJSONFromCommandLineOutput')
      .mockReturnValueOnce(fakeJSONOutput);
    jest
      .spyOn(memoryUnitUtil, 'setMapValuesToNewMeasurement')
      .mockReturnValueOnce(fakeNewMeasurementOutput);
    jest
      .spyOn(getStorageType, 'getStorageType')
      .mockReturnValueOnce(fakeStorageType);
    jest
      .spyOn(getTotalDiskCapacity, 'getTotalDiskCapacity')
      .mockReturnValueOnce(fakeDiskCapacity);

    // When
    const memoryInformation = getMemoryInformation();

    // Then
    expect(childProcess.execSync).toHaveBeenCalledTimes(1);
    expect(childProcess.execSync).toHaveBeenCalledWith('cat /proc/meminfo', {
      encoding: 'utf-8',
    });

    expect(
      stringParseUtil.buildJSONFromCommandLineOutput
    ).toHaveBeenCalledTimes(1);
    expect(stringParseUtil.buildJSONFromCommandLineOutput).toHaveBeenCalledWith(
      fakeMemInfoOutput,
      ['MemTotal', 'MemAvailable']
    );

    expect(memoryUnitUtil.setMapValuesToNewMeasurement).toHaveBeenCalledTimes(
      1
    );
    expect(memoryUnitUtil.setMapValuesToNewMeasurement).toHaveBeenCalledWith(
      fakeJSONOutput
    );

    expect(getStorageType.getStorageType).toHaveBeenCalledTimes(1);
    expect(getTotalDiskCapacity.getTotalDiskCapacity).toHaveBeenCalledTimes(1);

    expect(memoryInformation).toStrictEqual({
      ...fakeNewMeasurementOutput,
      PersistentStorageType: fakeStorageType,
      TotalDiskCapacity: fakeDiskCapacity,
    });
  });
});
