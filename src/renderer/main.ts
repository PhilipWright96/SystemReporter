// api exposed in preload.ts, but redeclared here to make eslint happy
declare const api: any;

function setCPUValues(lscpuMap: Record<string, any>): void {
  const architecture = document.getElementById('architecture');
  const coreCount = document.getElementById('cores');
  const modelName = document.getElementById('model-name');
  const vendor = document.getElementById('vendor');

  architecture!.innerText = `Architecture: ${lscpuMap.Architecture}`;
  coreCount!.innerText = `Core Count: ${api.threads}`;
  modelName!.innerText = `Model Name: ${lscpuMap.Modelname}`;
  vendor!.innerText = `Vendor:  ${lscpuMap.VendorID}`;
}

function setDyanmicValues(): void {
  const hostnameTag = document.getElementById('hostname');

  const { hostNameMap, lscpuMap } = api;

  setCPUValues(lscpuMap);

  hostnameTag!.innerText = `Hostname:  ${hostNameMap.Statichostname}`;
}

function setValuesOnHtml(): void {
  setDyanmicValues();
}

setValuesOnHtml();
