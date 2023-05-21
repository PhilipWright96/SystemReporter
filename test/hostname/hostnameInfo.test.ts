import childProcess from 'child_process';
import { getHostNameInformation } from '../../src/hostname/hostnameInfo';
import * as stringParseUtil from '../../src/util/stringParseUtil';

jest.mock('../../src/util/stringParseUtil');
jest.mock('child_process');

afterEach(() => {
  jest.clearAllMocks();
});

describe('getHostNameInformation', () => {
  it('should parse information from hostnamectl and return it', () => {
    // Given
    const dummyJSONOutput = { fakeProperty: 'fake value' },
      fakeHostnamectlOutput = Buffer.from('Fake hostnamectl output', 'utf-8');
    jest.spyOn(childProcess, 'execSync').mockReturnValue(fakeHostnamectlOutput);
    jest
      .spyOn(stringParseUtil, 'buildJSONFromCommandLineOutput')
      .mockReturnValueOnce(dummyJSONOutput);

    // When
    const hostnameInformation = getHostNameInformation();

    // Then
    expect(childProcess.execSync).toHaveBeenCalledTimes(1);
    expect(childProcess.execSync).toHaveBeenCalledWith('hostnamectl', {
      encoding: 'utf-8',
    });

    expect(
      stringParseUtil.buildJSONFromCommandLineOutput
    ).toHaveBeenCalledTimes(1);
    expect(stringParseUtil.buildJSONFromCommandLineOutput).toHaveBeenCalledWith(
      fakeHostnamectlOutput,
      ['Statichostname']
    );

    expect(hostnameInformation).toStrictEqual(dummyJSONOutput);
  });
});
