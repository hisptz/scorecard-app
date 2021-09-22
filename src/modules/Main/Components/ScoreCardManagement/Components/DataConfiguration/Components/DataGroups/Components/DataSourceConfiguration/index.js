import React from 'react'
import {useRecoilValue} from "recoil";
import {ScorecardConfigEditState} from "../../../../../../../../../../core/state/scorecard";
import {DataSourceInstructions} from "../../../Instructions";
import SelectedDataSourceConfigurationForm from "./Components/Form";

export default function DataSourceConfiguration() {
    const {selectedDataHolderIndex} = useRecoilValue(ScorecardConfigEditState)

    return (
        <div>

            {!isNaN(selectedDataHolderIndex) ?
                <SelectedDataSourceConfigurationForm/> :
                <div className='row center align-items-center'>
                    <DataSourceInstructions/>
                </div>
            }
        </div>
    )
}
