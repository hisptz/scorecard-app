export function getChunkChildIndex(chunkSize = 2, chunkIndex, childIndex) {
  return chunkSize * chunkIndex + childIndex;
}

export function customChunk(list = []) {
  const chunks = [];
  const listToModify = [...list];
  const i = 0;

  while (listToModify.length > 0) {
    if (listToModify[i]?.dataSources > 1) {
      chunks.push(listToModify.splice(i, 1));
      continue;
    }
    if (
      listToModify[i]?.dataSources?.length < 2 &&
      listToModify[i + 1]?.dataSources?.length < 2
    ) {
      chunks.push(listToModify.splice(i, 2));
      continue;
    }
    chunks.push(listToModify.splice(i, 1));
  }

  return chunks;
}
