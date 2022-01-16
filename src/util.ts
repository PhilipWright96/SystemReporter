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

function getFileSystemSizeInfo(commandLineOutput: string) {
  const cleanedStringOutput = commandLineOutput
      .replace(/\n+/g, '   ')
      .replace(/\s+/g, ' ')
      .split(' '),
    fileSystemToSizeInMB: Record<string, any> = {};

  for (let i = 2; i < cleanedStringOutput.length; i += 2) {
    const fileSystem = cleanedStringOutput[i],
      sizeOfFileSystem = cleanedStringOutput[i + 1];

    let sizeInMB;

    if (sizeOfFileSystem) {
      if (sizeOfFileSystem.includes('G')) {
        // Slicing here to remove size type char
        const amount = parseInt(sizeOfFileSystem.slice(0, -1));
        sizeInMB = convertGigabyteToMegabyte(amount);
      } else {
        sizeInMB = parseInt(sizeOfFileSystem.slice(0, -1));
      }
    }

    fileSystemToSizeInMB[fileSystem] = sizeInMB;
  }
  return fileSystemToSizeInMB;
}

function convertKilobyteToMegabyte(originalValue: number): number {
  return originalValue / 1024;
}

function convertGigabyteToMegabyte(originalValue: number): number {
  return originalValue * 1024;
}

// Note - Using 1024 which is technically 'ibyte' instead of 'abyte'
// https://www.techspot.com/news/68482-quickly-convert-between-storage-size-units-kb-mb.html
function convertValueToNewMemoryUnit(
  originalValue: number,
  currentUnit: string,
  newUnit: string
) {
  const memoryUnits = ['B', 'KB', 'MB', 'GB', 'TB'],
    currentUnitIndex = memoryUnits.indexOf(currentUnit),
    newUnitIndex = memoryUnits.indexOf(newUnit),
    indexDiff = Math.abs(newUnitIndex - currentUnitIndex);

  let newVal = originalValue;
  if (currentUnitIndex < newUnitIndex) {
    for (let i = 0; i < indexDiff; i++) {
      newVal /= 1024;
    }
  } else {
    for (let i = 0; i < indexDiff; i++) {
      newVal *= 1024;
    }
  }
  return newVal;
}

export {
  buildJSONFromCommandLineOutput,
  convertValueToNewMemoryUnit,
  getFileSystemSizeInfo,
  setMapValuesToNewMeasurement,
};
