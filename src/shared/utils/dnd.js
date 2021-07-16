


export function updateListFromDragAndDrop(groups, sourceIndex, destinationIndex) {
    if(!isNaN(destinationIndex) && !isNaN(sourceIndex)){
        const value = groups[sourceIndex];
        const newGroupList = [...groups]
        newGroupList.splice(sourceIndex, 1)
        newGroupList.splice(destinationIndex, 0, value)
        return newGroupList;
    }
    return groups;
}
