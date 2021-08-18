import {DataTable} from "@dhis2/ui";
import PropTypes from "prop-types";
import React, {Suspense, useEffect} from "react";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from 'react-dnd-html5-backend'
import {useRecoilCallback, useRecoilValueLoadable} from "recoil";
import {ScorecardTableConfigState, ScorecardViewState,} from "../../../../../../core/state/scorecard";
import useMediaQuery from "../../../../../../shared/hooks/useMediaQuery";
import ScorecardTableBody from "./Components/ScorecardTableBody";
import TableHeader from "./Components/TableHeader";
import TableLoader from "./Components/TableLoader";

export default function ScorecardTable({orgUnits, nested}) {
    const {width: screenWidth} = useMediaQuery();
    const tableConfig = useRecoilValueLoadable(ScorecardTableConfigState(orgUnits))


    const reset = useRecoilCallback(({reset}) => () => {
        reset(ScorecardViewState("orgUnitSearchKeyword"))
    })

    useEffect(() => {
        return () => {
            reset();
        };
    }, []);

    return (
        <div className="w-100 pb-32 flex-1">
            <DndProvider backend={HTML5Backend}>
                <DataTable
                    width={`${tableConfig?.contents?.tableWidth ?? screenWidth}px`}
                    scrollWidth={`${screenWidth}px`}
                    layout="fixed"
                >
                    <TableHeader orgUnits={orgUnits} nested={nested}/>
                    <Suspense fallback={<TableLoader/>}>
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
