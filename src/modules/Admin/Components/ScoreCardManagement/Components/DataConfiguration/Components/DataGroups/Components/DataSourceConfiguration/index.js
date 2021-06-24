import React from 'react'
import {useRecoilValue} from "recoil";
import {ScorecardEditState} from "../../../../../../../../../../core/state/scorecard";
import Instructions from "../../../Instructions";
import DataConfigurationScorecardForm from "./Components/Form";

export default function DataSourceConfiguration() {
    const {selectedDataSourceIndex} = useRecoilValue(ScorecardEditState)

    return (
        <div className='column'>
            <div className={`row ${isNaN(selectedDataSourceIndex) && 'center'}`}>
                {
                    !isNaN(selectedDataSourceIndex) ?
                        <div className='bordered' style={{width: '30%'}}>
                            <div className='column'>
                                <div className='p16'>
                                    <DataConfigurationScorecardForm />
                                </div>
                            </div>
                        </div> :
                        <div style={{margin: 'auto'}}>
                            <Instructions/>
                        </div>
                }
            </div>
        </div>
    )
}
