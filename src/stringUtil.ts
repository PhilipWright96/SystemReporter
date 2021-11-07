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
    const key = outputKeysAndValues[i]
      .replaceAll(' ', '')
      .replaceAll(/[\(\)']+/g, '');
    const value = outputKeysAndValues[i + 1].trim();
    hostNameMap[key] = value;
  }

  return hostNameMap;
}

export default buildJSONFromCommandLineOutput;
