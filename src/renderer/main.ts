// api exposed in preload.ts, but redeclared here to make eslint happy
declare const api: any;

function setCPUValues(lscpuMap: Record<string, any>): void {
  const architecture = document.getElementById('architecture');
  const coreCount = document.getElementById('cores');
  const minMHz = document.getElementById('min-mhz');
  const maxMHz = document.getElementById('max-mhz');
  const modelName = document.getElementById('model-name');
  const vendor = document.getElementById('vendor');

  architecture!.innerText = `Architecture: ${lscpuMap.Architecture}`;
  coreCount!.innerText = `Core Count: ${lscpuMap.CPUs}`;
  minMHz!.innerText = `Min MHz: ${lscpuMap.CPUminMHz}`;
  maxMHz!.innerText = `Max MHz: ${lscpuMap.CPUmaxMHz}`;
  modelName!.innerText = `Model Name: ${lscpuMap.Modelname}`;
  vendor!.innerText = `Vendor:  ${lscpuMap.VendorID}`;
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
