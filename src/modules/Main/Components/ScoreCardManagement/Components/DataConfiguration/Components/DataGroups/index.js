import {last, remove, set} from 'lodash'
import React, {useEffect} from 'react'
import {Droppable} from "react-beautiful-dnd";
import {useRecoilState, useResetRecoilState} from "recoil";
import DataSelection from "../../../../../../../../core/models/dataSelection";
import {ScorecardConfigDirtyState, ScorecardConfigEditState} from "../../../../../../../../core/state/scorecard";
import DataGroup from "./Components/DataGroup";


export default function DataGroups() {

    const [dataSelection, setDataSelection] = useRecoilState(ScorecardConfigDirtyState('dataSelection'));
    const resetEditState = useResetRecoilState(ScorecardConfigEditState)
    const {dataGroups: groups} = dataSelection || new DataSelection();
    const [expanded, setExpanded] = React.useState(last(groups)?.id);

    const handleAccordionChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };

    useEffect(() => {
        setExpanded(last(groups)?.id)
    }, [groups.length]);

    const onDeleteGroup = (id) => {
        const updatedGroupList = [...groups]
        remove(updatedGroupList, ['id', id])
        setDataSelection(prevState => DataSelection.set(prevState, 'dataGroups', updatedGroupList))
        resetEditState()
    }

    const onGroupUpdate = (index, newGroupData) => {
        const updatedGroupList = [...groups]
        set(updatedGroupList, [index], newGroupData)
        setDataSelection(prevState => DataSelection.set(prevState, 'dataGroups', updatedGroupList))
    }

    return (
        <Droppable droppableId={'group-area'}>
            {
                provided => (
                    <div {...provided.droppableProps} ref={provided.innerRef}>
                        <div>
                            {
                                groups?.map((group, index) => (
                                    <DataGroup
                                        onGroupUpdate={onGroupUpdate}
                                        onDelete={onDeleteGroup}
                                        index={index}
                                        key={group.id}
                                        group={group}
                                        expanded={expanded}
                                        handleAccordionChange={handleAccordionChange}
                                    />))
                            }
                            {
                                provided.placeholder
                            }
                        </div>
                    </div>
                )
            }
        </Droppable>)
}


