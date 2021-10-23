import { contextBridge } from 'electron';
import { cpus } from 'os';
import { execSync } from 'child_process';

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

function main(): void {
const hostNameOutput = execSync('hostnamectl', { encoding: 'utf-8' });
  const hostNameMap = buildJSONFromCommandLineOutput(hostNameOutput);

contextBridge.exposeInMainWorld('api', {
    hostNameMap,
  threads: cpus().length,
});
}

main();
