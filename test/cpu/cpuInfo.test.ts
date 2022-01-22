import childProcess from 'child_process';
import { getCPUInformation } from '../../src/cpu/cpuInfo';
import * as stringParseUtil from '../../src/util/stringParseUtil';

jest.mock('../../src/util/stringParseUtil');

describe('getCPUInformation', () => {
  it('should return correct result for adding two numbers', () => {
    // Given
    const dummyHostNameMap = { fakeProperty: 'fake value' };
    jest
      .spyOn(childProcess, 'execSync')
      .mockReturnValue(Buffer.from('Fake lscpu output', 'utf-8'));
    jest
      .spyOn(stringParseUtil, 'buildJSONFromCommandLineOutput')
      .mockReturnValueOnce(dummyHostNameMap);

    // When
    const cpuInformation = getCPUInformation();

    // Then
    expect(childProcess.execSync).toHaveBeenCalledTimes(1);
    expect(childProcess.execSync).toHaveBeenCalledWith('lscpu', {
      encoding: 'utf-8',
    });

    expect(
      stringParseUtil.buildJSONFromCommandLineOutput
    ).toHaveBeenCalledTimes(1);
    // expect(stringParseUtil.buildJSONFromCommandLineOutput).toHaveBeenCalledWith(
    //   'a',
    //   [
    //     'Architecture',
    //     'CPUs',
    //     'CPUminMHz',
    //     'CPUmaxMHz',
    //     'Modelname',
    //     'VendorID',
    //   ]
    // );
    expect(cpuInformation).toEqual(dummyHostNameMap);
  });
});
