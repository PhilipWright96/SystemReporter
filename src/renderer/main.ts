function buildJSONFromCommandLineOutput(
  commandLineOutput: string
): Record<string, any> {
  const hostNameMap: Record<string, any> = {};

  // Add XXX as a placeholder to easily distinguish different outputs of the command
  const cleanedStringOutput = commandLineOutput
    .replace(/\n+/g, 'XXX')
    .replace(/\s+/g, ' ')
    .trim();

  const outputKeysAndValues = cleanedStringOutput
    .split(/[:XXX]+/)
    .filter(Boolean);

  for (let i = 0; i < outputKeysAndValues.length; i += 2) {
    const key = outputKeysAndValues[i].replaceAll(' ', '');
    const value = outputKeysAndValues[i + 1].trim();
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
