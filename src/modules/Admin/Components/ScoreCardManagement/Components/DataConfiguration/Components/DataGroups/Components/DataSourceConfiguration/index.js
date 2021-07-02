import React from 'react'
import {useRecoilValue} from "recoil";
import {ScorecardEditState} from "../../../../../../../../../../core/state/scorecard";
import Instructions from "../../../Instructions";
import SelectedDataSourceConfigurationForm from "./Components/Form";

export default function DataSourceConfiguration() {
    const {selectedDataHolderIndex} = useRecoilValue(ScorecardEditState)

    return (
        !isNaN(selectedDataHolderIndex) ?
            <SelectedDataSourceConfigurationForm/> :
            <div style={{margin: 'auto'}}>
                <Instructions/>
            </div>
    )
}
