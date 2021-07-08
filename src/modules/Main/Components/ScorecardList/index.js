import {useSavedObjectList} from "@dhis2/app-service-datastore";
import {Button, ButtonStrip, Input} from '@dhis2/ui'
import AddIcon from "@material-ui/icons/Add";
import HelpIcon from '@material-ui/icons/Help';
import ViewModuleIcon from '@material-ui/icons/ViewModule';
import {isEmpty} from 'lodash'
import React from 'react'
import {useHistory} from "react-router-dom";
import EmptyScoreCardList from "../EmptyScoreCardList";
import ScorecardListCard from "./Components/ScorecardListCard";

export default function ScorecardList() {
    const history = useHistory();
    const [scorecardList] = useSavedObjectList({global: true})

    console.log(scorecardList)
    return (
        isEmpty(scorecardList) ? <EmptyScoreCardList/>: <div className='column'>
            <div className='row p-16'>
                <div className='w-100'>
                    <ButtonStrip end>
                        <Button icon={<HelpIcon/>}>Help</Button>
                        <Button icon={<ViewModuleIcon/>}/>
                        <Button onClick={()=>history.replace('/admin')} primary icon={<AddIcon/>}>Add New Scorecard</Button>
                    </ButtonStrip>
                </div>
            </div>
            <div className='row p-16' style={{justifyContent: 'flex-end'}}>
                <div className='column w-25'>
                    <Input placeholder="Search"/>
                </div>
            </div>
            <div className='scorecard-list-container grid p-32'>
                {
                    scorecardList?.map(scorecard => (<ScorecardListCard key={scorecard.id} scorecard={scorecard}/>))
                }
            </div>
        </div>
    )
}
