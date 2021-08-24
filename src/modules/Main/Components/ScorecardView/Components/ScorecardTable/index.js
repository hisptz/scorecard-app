import {DataTable} from "@dhis2/ui";
import PropTypes from "prop-types";
import React, {Suspense, useEffect} from "react";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from 'react-dnd-html5-backend'
import {useRecoilCallback, useRecoilValue} from "recoil";
import {ScorecardViewState,} from "../../../../../../core/state/scorecard";
import {ScreenDimensionState} from "../../../../../../core/state/window";
import ScorecardTableBody from "./Components/TableBody";
import TableHeader from "./Components/TableHeader";
import TableLoader from "./Components/TableLoader";


export default function ScorecardTable({orgUnits, nested}) {
    const {width: screenWidth} = useRecoilValue(ScreenDimensionState);
    const reset = useRecoilCallback(({reset}) => () => {
        reset(ScorecardViewState("orgUnitSearchKeyword"))
    })

    useEffect(() => {
        return () => {
            reset();
        };
    }, []);

    return (
        <div className="w-100 pb-32 flex-1 print-area">
            <DndProvider backend={HTML5Backend}>
                <DataTable
                    className='table-print'
                    layout="fixed"
                    width={screenWidth}
                    scrollWidth={screenWidth}
                >
                    <TableHeader orgUnits={orgUnits} nested={nested}/>
                    <Suspense fallback={<TableLoader orgUnits={orgUnits}/>}>
                        <ScorecardTableBody orgUnits={orgUnits}/>
                    </Suspense>
                </DataTable>
            </DndProvider>
        </div>
    );
}

ScorecardTable.propTypes = {
    nested: PropTypes.bool.isRequired,
    orgUnits: PropTypes.arrayOf(PropTypes.object).isRequired,
};
