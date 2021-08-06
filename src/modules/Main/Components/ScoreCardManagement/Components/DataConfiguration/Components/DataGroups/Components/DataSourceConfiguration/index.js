import React from 'react'
import {useRecoilValue} from "recoil";
import {ScorecardConfigEditState} from "../../../../../../../../../../core/state/scorecard";
import Instructions from "../../../Instructions";
import SelectedDataSourceConfigurationForm from "./Components/Form";

export default function DataSourceConfiguration() {
    const {selectedDataHolderIndex} = useRecoilValue(ScorecardConfigEditState)

    return (
        !isNaN(selectedDataHolderIndex) ?
            <SelectedDataSourceConfigurationForm/> :
            <div style={{margin: 'auto'}}>
                <Instructions/>
            </div>
    )
}
