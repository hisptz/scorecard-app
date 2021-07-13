import {useAlert} from "@dhis2/app-runtime";
import {useSetting} from "@dhis2/app-service-datastore";
import {Button, ButtonStrip, Input, Tooltip} from '@dhis2/ui'
import AddIcon from "@material-ui/icons/Add";
import HelpIcon from '@material-ui/icons/Help';
import ListViewIcon from '@material-ui/icons/Reorder';
import GridViewIcon from '@material-ui/icons/ViewModule';
import {isEmpty} from 'lodash'
import React, {Suspense} from 'react'
import {useHistory} from "react-router-dom";
import {useResetRecoilState} from "recoil";
import ScorecardState, {ScorecardIdState} from "../../../../core/state/scorecard";
import {FullPageLoader} from "../../../../shared/Components/Loaders";
import useAllScorecards from "../../../../shared/hooks/datastore/useAllScorecards";
import EmptyScoreCardList from "../EmptyScoreCardList";
import GridScorecardDisplay from "./Components/GridScorecardDisplay";
import ListScorecardDisplay from "./Components/ListScorecardDisplay";

export default function ScorecardList() {
    const resetScorecardState = useResetRecoilState(ScorecardState)
    const resetScorecardIdState = useResetRecoilState(ScorecardIdState)
    const history = useHistory();
    const [scorecardViewType, {set}] = useSetting('scorecardViewType')
    const {scorecards} = useAllScorecards()
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

    const onAddClick = () => {
        resetScorecardState();
        resetScorecardIdState();
        history.push('/admin')
    }

    return (
        <Suspense fallback={<FullPageLoader/>}>
            {
                isEmpty(scorecards) ?
                    <EmptyScoreCardList/> :
                    <div className='column'>
                        <div className='row p-16'>
                            <div className='w-100'>
                                <ButtonStrip end>
                                    <Button icon={<HelpIcon/>}>Help</Button>
                                    <Tooltip
                                        content={`Change to ${scorecardViewType === 'grid' ? 'list' : 'grid'} view`}>
                                        <Button onClick={onViewChange}
                                                icon={scorecardViewType === 'grid' ? <ListViewIcon/> :
                                                    <GridViewIcon/>}/>
                                    </Tooltip>
                                    <Button onClick={onAddClick} primary icon={<AddIcon/>}>Add New
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
                            scorecardViewType === 'grid' ? <GridScorecardDisplay scorecards={scorecards}/> :
                                <ListScorecardDisplay scorecards={scorecards}/>
                        }
                    </div>
            }
        </Suspense>
    )
}
