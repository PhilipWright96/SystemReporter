import { execSync } from 'child_process';

function getIPAddressInformation() {
  const privateIpv4Address = execSync('hostname -I', { encoding: 'utf-8' }),
    publicIpv4Address = execSync('curl ifconfig.me', { encoding: 'utf-8' }),
    ipv6Command =
      "ip addr | grep inet6 | grep -vwE '(host)' | awk '{print $2;}' | tr -d '\r\n'",
    privateIpv6Address = execSync(ipv6Command, { encoding: 'utf-8' });

  return Object.freeze({
    privateIpv4Address,
    publicIpv4Address,
    privateIpv6Address,
  });
}

export { getIPAddressInformation };
