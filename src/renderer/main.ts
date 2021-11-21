// api exposed in preload.ts, but redeclared here to make eslint happy
declare const api: any;

function setCPUValues(lscpuMap: Record<string, any>): void {
  const htmlTagToInnerText: Record<string, any> = Object.freeze({
    Architecture: 'Architecture: ',
    CPUs: 'Core Count: ',
    CPUminMHz: 'Min MHz: ',
    CPUmaxMHz: 'Max MHz',
    Modelname: 'Model Name: ',
    VendorID: 'Vendor: ',
  });

  Object.entries(lscpuMap).forEach((commandOutput) => {
    const commandOutputKey = commandOutput[0];
    const commandOutputResult = commandOutput[1];
    if (Object.keys(htmlTagToInnerText).includes(commandOutputKey)) {
      const htmlTag = document.getElementById(commandOutputKey);
      htmlTag!.innerText = `${htmlTagToInnerText[commandOutputKey]}: ${commandOutputResult}`;
    }
  });
}

function setIdentifierValues(
  hostNameMap: Record<string, any>,
  ipAddressMap: Record<string, any>
): void {
  const hostnameTag = document.getElementById('hostname');
  const publicIpv4AddressTag = document.getElementById('public-ipv4-address');
  const privateIpv4AddressTag = document.getElementById('private-ipv4-address');
  const privateIpv6AddressTag = document.getElementById('private-ipv6-address');

  hostnameTag!.innerText = `Hostname:  ${hostNameMap.Statichostname}`;
  publicIpv4AddressTag!.innerText = `Public IPv4 Address: ${ipAddressMap.publicIpv4Address}`;
  privateIpv4AddressTag!.innerText = `Private IPv4 Address: ${ipAddressMap.privateIpv4Address}`;
  privateIpv6AddressTag!.innerText = `IPv6 Address: ${ipAddressMap.privateIpv6Address}`;
}

function setDyanmicValues(): void {
  const { hostNameMap, ipAddressMap, lscpuMap } = api;

  setCPUValues(lscpuMap);
  setIdentifierValues(hostNameMap, ipAddressMap);
}

function setValuesOnHtml(): void {
  setDyanmicValues();
}

setValuesOnHtml();
