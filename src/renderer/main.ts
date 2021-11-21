// api exposed in preload.ts, but redeclared here to make eslint happy
declare const api: any;

function setObjectValuesOnHtml(valuesToSetOnHtml: Record<string, any>): void {
  Object.entries(valuesToSetOnHtml).forEach((commandOutput) => {
    const commandOutputKey = commandOutput[0],
      commandOutputResult = commandOutput[1],
      htmlTag = document.getElementById(commandOutputKey);
    htmlTag!.innerText = `${htmlTag!.innerText}: ${commandOutputResult}`;
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

function setDyanmicValues(): void {
  const { hostNameMap, ipAddressMap, lscpuMap } = api;

  setCPUValues(lscpuMap);
  setIdentifierValues(hostNameMap, ipAddressMap);
}

function setValuesOnHtml(): void {
  setDyanmicValues();
}

setValuesOnHtml();
