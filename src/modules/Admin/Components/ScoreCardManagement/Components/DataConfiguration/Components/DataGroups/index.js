import {remove, set} from 'lodash'
import React from 'react'
import {Droppable} from "react-beautiful-dnd";
import {useRecoilState, useResetRecoilState} from "recoil";
import DataSelection from "../../../../../../../../core/models/dataSelection";
import  {ScorecardEditState, ScorecardStateSelector} from "../../../../../../../../core/state/scorecard";
import DataGroup from "./Components/DataGroup";


export default function DataGroups() {

    const [expanded, setExpanded] = React.useState('panel1');
    const [dataSelection, setDataSelection] = useRecoilState(ScorecardStateSelector('dataSelection'));
    const resetEditState = useResetRecoilState(ScorecardEditState)
    const {dataGroups: groups} = dataSelection || new DataSelection();

    const handleAccordionChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };

    const onDeleteGroup = (id) => {
        const updatedGroupList = [...groups]
        remove(updatedGroupList, ['id', id])
        setDataSelection(prevState=>DataSelection.set(prevState, 'dataGroups', updatedGroupList))
        resetEditState()
    }

    const onGroupUpdate = (index, newGroupData) => {
        const updatedGroupList = [...groups]
        set(updatedGroupList, [index], newGroupData)
        setDataSelection(prevState=>DataSelection.set(prevState, 'dataGroups', updatedGroupList))
    }

    return (
        <Droppable droppableId={'id'}>
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


