import {Button, Checkbox, colors} from '@dhis2/ui'
import AddIcon from "@material-ui/icons/Add";
import {isEmpty} from 'lodash'
import React from 'react'
import {DragDropContext} from "react-beautiful-dnd";
import {useRecoilState, useSetRecoilState} from "recoil";
import {ScorecardEditState, ScorecardStateSelector} from "../../../../../../core/state/scorecard";
import {updateListFromDragAndDrop} from "../../../../../../shared/utils/dnd";
import DataGroups from "./Components/DataGroups";
import DataSourceConfiguration from "./Components/DataGroups/Components/DataSourceConfiguration";
import {generateNewGroupData} from "./utils";


// TODO: Implementation of data source configuration
// TODO: Saving values to state
// TODO: Save general values to state
// TODO: Implement the preview table
// TODO: Implement linking by button
// TODO: Implement linking by dnd


export default function DataConfigurationScorecardForm() {
    const [dataSourceGroups, updateDataSourceGroups] = useRecoilState(ScorecardStateSelector('dataSourceGroups'))
    const [targetOnLevels, updateTargetOnLevels] = useRecoilState(ScorecardStateSelector('targetOnLevels'))
    const setScorecardEditState = useSetRecoilState(ScorecardEditState)
    const groups = dataSourceGroups;

    const onGroupAdd = async () => {
        await updateDataSourceGroups((prevState = []) => (
            [...prevState, generateNewGroupData(groups)]
        ))
    }

    const onDragEnd = async (result) => {
        const {destination, source} = result || {};
        updateDataSourceGroups((prevState) => ([...updateListFromDragAndDrop(prevState, source?.index, destination?.index)]))
        setScorecardEditState((prevState) => {
            if (prevState.selectedGroupIndex === source?.index) {
                return {
                    ...prevState,
                    selectedGroupIndex: destination?.index
                }
            }
            return prevState;
        })
    }

    return (
        <div className='container'>
            <div className='row'>
                <div className='column p-16 w-25'>
                    <div className='bordered' style={{minHeight: 500, height: '100%'}}>
                        <div className='row space-between pr-16 pt-16'>
                            <p style={{margin: 0}} className='pl-16'>Set Target on Levels</p>
                            <Checkbox checked={targetOnLevels}
                                      onChange={() => updateTargetOnLevels(prevState => !prevState)}/>
                        </div>
                        <h4 className='pl-16'>Groups</h4>
                        {
                            isEmpty(groups) ?
                                <div className='column center text-center'>
                                    <p style={{color: colors.grey700}}>Add a group to start</p>
                                </div> :
                                <DragDropContext onDragEnd={onDragEnd}>
                                    <DataGroups/>
                                </DragDropContext>
                        }
                        <div className='p-8 column align-items-center'>
                            <Button onClick={onGroupAdd} icon={<AddIcon/>}>Add Group</Button>
                        </div>
                    </div>
                </div>
                <div className='w-75 column p-16 center'>
                    <div className='row flex-1 align-items-center'>
                        <DataSourceConfiguration/>
                    </div>
                </div>

            </div>
        </div>
    )
}
