function buildJSONFromCommandLineOutput(
  commandLineOutput: string,
  supportedValues: string[] = []
): Record<string, any> {
  const hostNameMap: Record<string, any> = {};

  // Add XXX as a placeholder to easily distinguish different outputs of the command
  const cleanedStringOutput = commandLineOutput
      .replace(/\n+/g, 'XXX')
      .replace(/\s+/g, ' ')
      .trim(),
    outputKeysAndValues = cleanedStringOutput.split(/[:XXX]+/).filter(Boolean);

  for (let i = 0; i < outputKeysAndValues.length; i += 2) {
    // Remove space and brackets from string for valid object key
    const key = outputKeysAndValues[i]
        .replaceAll(' ', '')
        .replaceAll(/[\(\)']+/g, ''),
      value = outputKeysAndValues[i + 1].trim();

    if (supportedValues.length === 0 || supportedValues.includes(key)) {
      hostNameMap[key] = value;
    }
  }

  return hostNameMap;
}

function setMapValuesToNewMeasurement(mapToConvert: Record<string, any>) {
  Object.keys(mapToConvert).forEach((key) => {
    const oldNumericalValue = mapToConvert[key].match(/\d+/),
      newVal = convertKilobyteToMegabyte(oldNumericalValue).toFixed(2);
    mapToConvert[key] = `${newVal} MB`;
  });
  return mapToConvert;
}

function convertKilobyteToMegabyte(originalValue: number): number {
  return originalValue / 1024;
}

// function convertBytesToGivenMeasurement(bytes: number, measurement: string) {
//   const k = 1024;
//   const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

//   const i = Math.floor(Math.log(bytes) / Math.log(k));

//   return (
//     parseFloat((bytes / Math.pow(k, sizes.indexOf(measurement))).toFixed(2)) +
//     ' ' +
//     sizes[i]
//   );
// }

export { buildJSONFromCommandLineOutput, setMapValuesToNewMeasurement };
