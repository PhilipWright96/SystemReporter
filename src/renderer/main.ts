function buildJSONFromCommandLineOutput(commandLineOutput: string) {
  const xAsBreaks = commandLineOutput.replace(/\n+/g, 'XXX');

  const trimmedWhitespace = xAsBreaks.replace(/\s+/g, ' ').trim();

  const arrayofKeysAndValues = trimmedWhitespace
    .split(/[:XXX]+/)
    .filter(Boolean);

  const hostNameMap: Record<string, any> = {};

  for (let i = 0; i < arrayofKeysAndValues.length; i += 2) {
    const key = arrayofKeysAndValues[i].replaceAll(' ', '');
    const value = arrayofKeysAndValues[i + 1].trim();
    hostNameMap[key] = value;
  }

  return hostNameMap;
}

// api exposed in preload.ts, but redeclared here to make eslint happy
declare const api: any;

const coreCount = document.getElementById('cores');
const hostnameTag = document.getElementById('hostname');

const { hostNameOutput } = api;

const hostNameMap = buildJSONFromCommandLineOutput(hostNameOutput);

coreCount!.innerText = `Core Count: ${api.threads}`;
hostnameTag!.innerText = `Hostname:  ${hostNameMap.Statichostname}`;
