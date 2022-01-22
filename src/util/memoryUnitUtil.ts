/** 
 Note - Using 1024 which is technically 'ibyte' instead of 'abyte'. 
 https://www.techspot.com/news/68482-quickly-convert-between-storage-size-units-kb-mb.html
 */
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

function setMapValuesToNewMeasurement(mapToConvert: Record<string, any>) {
  Object.keys(mapToConvert).forEach((key) => {
    const oldNumericalValue = mapToConvert[key].match(/\d+/),
      newVal = convertValueToNewMemoryUnit(
        oldNumericalValue,
        'KB',
        'MB'
      ).toFixed(2);
    mapToConvert[key] = `${newVal} MB`;
  });
  return mapToConvert;
}

export { convertValueToNewMemoryUnit, setMapValuesToNewMeasurement };
