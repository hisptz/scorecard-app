import {DataTable} from "@dhis2/ui";
import PropTypes from "prop-types";
import React, {Suspense, useEffect, useMemo} from "react";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import {useRecoilCallback, useRecoilValue} from "recoil";
import ScorecardTableBody from "./Components/TableBody";
import TableHeader from "./Components/TableHeader";
import TableLoader, {TableLinearLoader} from "./Components/TableLoader";
import classes from "./scorecardTable.module.css"
import TableWidth from "./Components/TableWidth";
import {ScorecardDataEngine} from "../../../../models";
import {ScorecardDataLoadingState, ScorecardTableConfigState, ScreenDimensionState} from "../../../../state";

export default function ScorecardTable({
                                           orgUnits,
                                           nested,
                                           initialDataEngine,
                                       }) {
    const dataEngine = useMemo(
        () => initialDataEngine ?? new ScorecardDataEngine(),
        [initialDataEngine]
    );

    const {width: screenWidth} = useRecoilValue(ScreenDimensionState);
    const {tableWidth} = useRecoilValue(ScorecardTableConfigState(orgUnits));
    const reset = useRecoilCallback(({reset}) => () => {
        reset(ScorecardDataLoadingState(orgUnits));
        dataEngine.reset(true);
    });

    useEffect(() => {
        return () => {
            reset();
        };
    }, []);

    return (
        <div className="w-100 pb-32 flex-1 print-area scorecard-table overflow-hidden">
            <DndProvider backend={HTML5Backend}>
                <DataTable
                    className={classes["table-print"]}
                    layout="fixed"
                    scrollWidth={tableWidth ?? screenWidth}
                >
                    <TableWidth orgUnits={orgUnits}/>
                    <TableHeader
                        width={screenWidth}
                        orgUnits={orgUnits}
                        nested={nested}
                    />
                    <TableLinearLoader orgUnits={orgUnits} dataEngine={dataEngine}/>
                    <Suspense fallback={<TableLoader orgUnits={orgUnits}/>}>
                        <ScorecardTableBody dataEngine={dataEngine} orgUnits={orgUnits}/>
                    </Suspense>
                </DataTable>
            </DndProvider>
        </div>
    );
}

ScorecardTable.propTypes = {
    nested: PropTypes.bool.isRequired,
    orgUnits: PropTypes.arrayOf(PropTypes.object).isRequired,
    initialDataEngine: PropTypes.instanceOf(ScorecardDataEngine),
};
