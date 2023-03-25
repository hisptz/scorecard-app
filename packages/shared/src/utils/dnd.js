export function updateListFromDragAndDrop(
  groups,
  sourceIndex,
  destinationIndex
) {
  if (!isNaN(destinationIndex) && !isNaN(sourceIndex)) {
    const value = groups[sourceIndex];
    const newGroupList = [...groups];
    newGroupList.splice(sourceIndex, 1);
    newGroupList.splice(destinationIndex, 0, value);
    return newGroupList;
  }
  return groups;
}

export function updateListsFromDragAndDrop(
  { sourceList, destinationList },
  { sourceIndex, destinationIndex }
) {
  if (!isNaN(destinationIndex) && !isNaN(sourceIndex)) {
    const value = sourceList[sourceIndex];
    const newSourceList = [...sourceList];
    const newDestinationList = [...destinationList];

    newSourceList.splice(sourceIndex, 1);
    newDestinationList.splice(destinationIndex, 0, value);

    return {
      destinationList: newDestinationList,
      sourceList: newSourceList,
    };
  }
}
