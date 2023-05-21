import childProcess from 'child_process';
import { getIPAddressInformation } from '../../src/ipaddress/ipaddressInfo';

jest.mock('child_process');

afterEach(() => {
  jest.clearAllMocks();
});

describe('getIPAddressInformation', () => {
  it('should run various ip related commands and return their output', () => {
    // Given
    const fakeHostnameOutput = Buffer.from('Fake hostnamectl output', 'utf-8'),
      fakeCurlOutput = Buffer.from('Fake curl output', 'utf-8'),
      fakePrivateIpv6Output = Buffer.from('Fake private ipv6 output', 'utf-8'),
      expectedIpv6Command =
        "ip addr | grep inet6 | grep -vwE '(host)' | awk '{print $2;}' | tr -d '\r\n'";

    jest
      .spyOn(childProcess, 'execSync')
      .mockReturnValueOnce(fakeHostnameOutput);
    jest.spyOn(childProcess, 'execSync').mockReturnValueOnce(fakeCurlOutput);
    jest
      .spyOn(childProcess, 'execSync')
      .mockReturnValueOnce(fakePrivateIpv6Output);

    // When
    const ipAddressInformation = getIPAddressInformation();

    // Then
    expect(childProcess.execSync).toHaveBeenCalledTimes(3);
    expect(childProcess.execSync).toHaveBeenCalledWith('curl ifconfig.me', {
      encoding: 'utf-8',
    });
    expect(childProcess.execSync).toHaveBeenCalledWith('hostname -I', {
      encoding: 'utf-8',
    });
    expect(childProcess.execSync).toHaveBeenCalledWith(expectedIpv6Command, {
      encoding: 'utf-8',
    });

    expect(ipAddressInformation).toStrictEqual({
      privateIpv4Address: fakeHostnameOutput,
      publicIpv4Address: fakeCurlOutput,
      privateIpv6Address: fakePrivateIpv6Output,
    });
  });
});
