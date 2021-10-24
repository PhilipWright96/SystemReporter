// api exposed in preload.ts, but redeclared here to make eslint happy
declare const api: any;

function setDyanmicValues(): void {
  const coreCount = document.getElementById('cores');
  const hostnameTag = document.getElementById('hostname');

  const { hostNameMap } = api;

  coreCount!.innerText = `Core Count: ${api.threads}`;
  hostnameTag!.innerText = `Hostname:  ${hostNameMap.Statichostname}`;
}

function main(): void {
  setDyanmicValues();
}

main();
