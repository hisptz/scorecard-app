import i18n from "@dhis2/d2-i18n";
import {DataTableCell, DataTableRow, Tooltip} from "@dhis2/ui";
import PropTypes from "prop-types";
import React, {Suspense, useEffect, useState} from "react";
import {useRecoilValue} from "recoil";
import {DraggableItems} from "../../../../../../../core/constants/draggables";
import {PeriodResolverState} from "../../../../../../../core/state/period";
import {
    ScorecardConfigDirtyState,
    scorecardDataEngine,
    ScorecardViewState,
} from "../../../../../../../core/state/scorecard";
import ScorecardTable from "../index";
import DroppableCell from "./DroppableCell";
import OrgUnitContainer from "./OrgUnitContainer";
import DataContainer from "./TableDataContainer";

export default function ChildOrgUnitRow({orgUnit, expandedOrgUnit, onExpand}) {
    const {emptyRows} = useRecoilValue(ScorecardViewState('options'))
    const [isEmpty, setIsEmpty] = useState(false);
    const {id} = orgUnit ?? {};
    const {dataGroups} =
    useRecoilValue(ScorecardConfigDirtyState("dataSelection")) ?? {};

    const periods =
        useRecoilValue(PeriodResolverState) ?? [];


    useEffect(() => {
        const rowStatusSub = scorecardDataEngine.isRowEmpty(id).subscribe(setIsEmpty)
        return () => {
            rowStatusSub.unsubscribe()
        }
    }, [orgUnit])

    return ((emptyRows || !isEmpty) &&
        <DataTableRow
            expanded={id === expandedOrgUnit}
            onExpandToggle={() => {
                if (id === expandedOrgUnit) {
                    onExpand(undefined);
                } else {
                    onExpand(id);
                }
            }}
            expandableContent={
                <div className="p-16">
                    <Suspense fallback={<div>Loading...</div>}>
                        <ScorecardTable
                            nested={true}
                            orgUnits={[orgUnit]}
                        />
                    </Suspense>
                </div>
            }
            key={id}
            bordered
        >
            <DataTableCell fixed left={"50px"}>
                <Tooltip content={i18n.t('Drag to column headers to change layout')}>
                    <DroppableCell accept={[DraggableItems.DATA_COLUMN]}>
                        <OrgUnitContainer orgUnit={orgUnit}/>
                    </DroppableCell>
                </Tooltip>
            </DataTableCell>
            {dataGroups?.map(({id: groupId, dataHolders}) =>
                dataHolders?.map(({id: holderId, dataSources}) =>
                    periods?.map(({id: periodId}) => (
                        <td
                            className="data-cell"
                            align="center"
                            key={`${groupId}-${holderId}-${periodId}`}
                        >
                            <DataContainer
                                orgUnitId={id}
                                dataSources={dataSources}
                                periodId={periodId}
                            />
                        </td>
                    ))
                )
            )}
        </DataTableRow>
    );
}

ChildOrgUnitRow.propTypes = {
    orgUnit: PropTypes.object.isRequired,
    onExpand: PropTypes.func.isRequired,
    expandedOrgUnit: PropTypes.string,
};
