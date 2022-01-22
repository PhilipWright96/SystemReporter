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

export { convertValueToNewMemoryUnit };
