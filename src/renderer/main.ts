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
  ipv4Address: string
): void {
  const hostnameTag = document.getElementById('hostname');
  const ipv4AddressTag = document.getElementById('ipv4-address');

  hostnameTag!.innerText = `Hostname:  ${hostNameMap.Statichostname}`;
  ipv4AddressTag!.innerText = `IPv4 Address: ${ipv4Address}`;
}

function setDyanmicValues(): void {
  const { hostNameMap, ipv4Address, lscpuMap } = api;

  setCPUValues(lscpuMap);
  setIdentifierValues(hostNameMap, ipv4Address);
}

function setValuesOnHtml(): void {
  setDyanmicValues();
}

setValuesOnHtml();
