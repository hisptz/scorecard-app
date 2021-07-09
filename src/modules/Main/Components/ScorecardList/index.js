import {useAlert} from "@dhis2/app-runtime";
import {useSavedObjectList, useSetting} from "@dhis2/app-service-datastore";
import {Button, ButtonStrip, Input, Tooltip} from '@dhis2/ui'
import AddIcon from "@material-ui/icons/Add";
import HelpIcon from '@material-ui/icons/Help';
import ListViewIcon from '@material-ui/icons/Reorder';
import GridViewIcon from '@material-ui/icons/ViewModule';
import {isEmpty} from 'lodash'
import React from 'react'
import {useHistory} from "react-router-dom";
import EmptyScoreCardList from "../EmptyScoreCardList";
import GridScorecardDisplay from "./Components/GridScorecardDisplay";
import ListScorecardDisplay from "./Components/ListScorecardDisplay";

export default function ScorecardList() {
    const history = useHistory();
    const [scorecardViewType, {set}] = useSetting('scorecardViewType')
    const [scorecardList] = useSavedObjectList({global: true})
    const {show} = useAlert(({message}) => message, ({type}) => ({...type, duration: 3000}))

    const onViewChange = () => {
        try {
            if (scorecardViewType === 'grid') {
                set('list')
                show({
                    message: 'View changed successfully',
                    type: {success: true}
                })
                return;
            }
            set('grid')
            show({
                message: 'View changed successfully',
                type: {success: true}
            })
        } catch (e) {
            show({
                message: e.message ?? e.toString(),
                type: {critical: true}
            })
        }
    }

    return (
        isEmpty(scorecardList) ? <EmptyScoreCardList/> :
            <div className='column'>
                <div className='row p-16'>
                    <div className='w-100'>
                        <ButtonStrip end>
                            <Button icon={<HelpIcon/>}>Help</Button>
                            <Tooltip content={`Change to ${scorecardViewType === 'grid' ? 'list' : 'grid'} view`}>
                                <Button onClick={onViewChange}
                                        icon={scorecardViewType === 'grid' ? <ListViewIcon/> : <GridViewIcon/>}/>
                            </Tooltip>
                            <Button onClick={() => history.push('/admin')} primary icon={<AddIcon/>}>Add New
                                Scorecard</Button>
                        </ButtonStrip>
                    </div>
                </div>
                <div className='row p-16 center'>
                    <div className='column w-50'>
                        <Input placeholder="Search"/>
                    </div>
                </div>
                {
                    scorecardViewType === 'grid' ? <GridScorecardDisplay scorecards={scorecardList}/> :
                        <ListScorecardDisplay scorecards={scorecardList}/>
                }
            </div>
    )
}
