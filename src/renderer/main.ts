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

function setCPUValues(cpuInformation: Record<string, any>): void {
  setObjectValuesOnHtml(cpuInformation);
}

function setIdentifierValues(
  hostNameInformation: Record<string, any>,
  idAddressInformation: Record<string, any>
): void {
  setObjectValuesOnHtml(hostNameInformation);
  setObjectValuesOnHtml(idAddressInformation);
}

function setMemoryValues(memoryInformation: Record<string, any>): void {
  setObjectValuesOnHtml(memoryInformation);
}

function setDyanmicValues(): void {
  const {
    cpuInformation,
    hostNameInformation,
    idAddressInformation,
    memoryInformation,
  } = api;

  setCPUValues(cpuInformation);
  setIdentifierValues(hostNameInformation, idAddressInformation);
  setMemoryValues(memoryInformation);
}

function setValuesOnHtml(): void {
  setDyanmicValues();
}

setValuesOnHtml();
