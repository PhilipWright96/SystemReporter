import { convertValueToNewMemoryUnit } from '../util/memoryUnitUtil';

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
        sizeInMB = convertValueToNewMemoryUnit(amount, 'GB', 'MB');
      } else {
        sizeInMB = parseInt(sizeOfFileSystem.slice(0, -1));
      }
    }

    fileSystemToSizeInMB[fileSystem] = sizeInMB;
  }
  return fileSystemToSizeInMB;
}

export {
  buildJSONFromCommandLineOutput,
  convertValueToNewMemoryUnit,
  getFileSystemSizeInfo,
};
