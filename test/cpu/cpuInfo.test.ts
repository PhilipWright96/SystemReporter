import childProcess from 'child_process';
import { getCPUInformation } from '../../src/cpu/cpuInfo';
import * as stringParseUtil from '../../src/util/stringParseUtil';

jest.mock('../../src/util/stringParseUtil');
jest.mock('child_process');

describe('getCPUInformation', () => {
  it('should parse information from lscpu and return it', () => {
    // Given
    const dummyHostNameMap = { fakeProperty: 'fake value' },
      fakeLsuOutput = Buffer.from('Fake lscpu output', 'utf-8');
    jest.spyOn(childProcess, 'execSync').mockReturnValue(fakeLsuOutput);
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
    expect(stringParseUtil.buildJSONFromCommandLineOutput).toHaveBeenCalledWith(
      fakeLsuOutput,
      [
        'Architecture',
        'CPUs',
        'CPUminMHz',
        'CPUmaxMHz',
        'Modelname',
        'VendorID',
      ]
    );

    expect(cpuInformation).toEqual(dummyHostNameMap);
  });
});
