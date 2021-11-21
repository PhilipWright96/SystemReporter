// api exposed in preload.ts, but redeclared here to make eslint happy
declare const api: any;

function setObjectValuesOnHtml(
  valuesToSetOnHtml: Record<string, any>,
  supportedKeys: string[]
): void {
  Object.entries(valuesToSetOnHtml).forEach((commandOutput) => {
    const commandOutputKey = commandOutput[0];
    const commandOutputResult = commandOutput[1];
    if (supportedKeys.includes(commandOutputKey)) {
      const htmlTag = document.getElementById(commandOutputKey);
      htmlTag!.innerText = `${htmlTag!.innerText}: ${commandOutputResult}`;
    }
  });
}

function setCPUValues(lscpuMap: Record<string, any>): void {
  setObjectValuesOnHtml(lscpuMap, [
    'Architecture',
    'CPUs',
    'CPUminMHz',
    'CPUmaxMHz',
    'Modelname',
    'VendorID',
  ]);
}

function setIdentifierValues(
  hostNameMap: Record<string, any>,
  ipAddressMap: Record<string, any>
): void {
  setObjectValuesOnHtml(hostNameMap, ['Statichostname']);
  setObjectValuesOnHtml(ipAddressMap, [
    'publicIpv4Address',
    'privateIpv4Address',
    'privateIpv6Address',
  ]);
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
