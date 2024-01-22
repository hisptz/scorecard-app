import {CircularLoader, DataTableCell, DataTableRow, LinearLoader,} from "@dhis2/ui";
import PropTypes from "prop-types";
import React, {useEffect, useState} from "react";
import {useRecoilValue} from "recoil";
import {useMediaQuery} from "../../../../../hooks";
import {ScorecardDataLoadingState, ScorecardTableConfigState} from "../../../../../state";
import {ScorecardDataEngine} from "../../../../../models";


export default function TableLoader() {
    const {width: screenWidth} = useMediaQuery();
    return (
        <DataTableRow>
            <DataTableCell width={`${screenWidth}px`} align="center">
                <div
                    className="row center align-items-center"
                    style={{height: 400, width: "100%"}}
                >
                    <CircularLoader small/>
                </div>
            </DataTableCell>
        </DataTableRow>
    );
}

export function TableLinearLoader({dataEngine, orgUnits}) {
    const {width: screenWidth} = useMediaQuery();
    const {colSpan} = useRecoilValue(ScorecardTableConfigState(orgUnits));
    const loading = useRecoilValue(ScorecardDataLoadingState(orgUnits));
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const subscription = dataEngine.getProgress().subscribe(setProgress);
        return () => {
            subscription.unsubscribe();
        };
    }, [orgUnits, dataEngine]);

    return loading ? (
        <DataTableRow>
            <td colSpan={colSpan}>
                <LinearLoader width={`${screenWidth}px`} amount={progress} margin={0}/>
            </td>
        </DataTableRow>
    ) : null;
}

TableLinearLoader.propTypes = {
    dataEngine: PropTypes.instanceOf(ScorecardDataEngine).isRequired,
    orgUnits: PropTypes.array.isRequired,
};
