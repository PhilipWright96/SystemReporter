// api exposed in preload.ts, but redeclared here to make eslint happy
declare const api: any;

function setObjectValuesOnHtml(valuesToSetOnHtml: Record<string, any>): void {
  Object.entries(valuesToSetOnHtml).forEach((entry) => {
    const key = entry[0],
      value = entry[1],
      htmlTag = document.getElementById(key);
    htmlTag!.innerText = `${htmlTag!.innerText}: ${value}`;
  });
}

function setCPUValues(lscpuMap: Record<string, any>): void {
  setObjectValuesOnHtml(lscpuMap);
}

function setIdentifierValues(
  hostNameMap: Record<string, any>,
  ipAddressMap: Record<string, any>
): void {
  setObjectValuesOnHtml(hostNameMap);
  setObjectValuesOnHtml(ipAddressMap);
}

function setMemoryValues(memoryMap: Record<string, any>): void {
  setObjectValuesOnHtml(memoryMap);
}

function setDyanmicValues(): void {
  const { hostNameMap, ipAddressMap, lscpuMap, memoryMap } = api;

  setCPUValues(lscpuMap);
  setIdentifierValues(hostNameMap, ipAddressMap);
  setMemoryValues(memoryMap);
}

function setValuesOnHtml(): void {
  setDyanmicValues();
}

setValuesOnHtml();
