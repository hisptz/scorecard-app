import {DataTableCell, DataTableRow, CircularLoader} from '@dhis2/ui'
import PropTypes from 'prop-types'
import React from 'react'
import {useRecoilValue} from "recoil";
import {ScorecardTableConfigState} from "../../../../../../../core/state/scorecard";
import useMediaQuery from "../../../../../../../shared/hooks/useMediaQuery";

export default function TableLoader({orgUnits}) {
    const {width: screenWidth} = useMediaQuery();
    const {colSpan} = useRecoilValue(ScorecardTableConfigState(orgUnits))

    return (
        <DataTableRow>
            <DataTableCell  width={`${screenWidth}px`} align='center' colSpan={colSpan} >
                <div className='row center align-items-center' style={{height: 400 , width: '100%'}}>
                    <CircularLoader small />
                </div>
            </DataTableCell>
        </DataTableRow>
    )
}


TableLoader.propTypes = {
    orgUnits: PropTypes.array.isRequired
};
