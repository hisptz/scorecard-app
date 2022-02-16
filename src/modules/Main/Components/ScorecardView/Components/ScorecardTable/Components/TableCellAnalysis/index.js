import i18n from "@dhis2/d2-i18n";
import {Button, Chip, Modal, ModalActions, ModalContent} from "@dhis2/ui";
import DescriptionIcon from "@material-ui/icons/Description";
import ChartIcon from "@material-ui/icons/Equalizer";
import TableChartIcon from "@material-ui/icons/TableChart";
import {cloneDeep, find, get} from "lodash";
import PropTypes from "prop-types";
import React, {Suspense, useEffect, useState} from "react";
import {
    useRecoilCallback,
    useRecoilValue,
    useRecoilValueLoadable,
    useResetRecoilState,
    useSetRecoilState
} from "recoil";
import OrgUnitSelection from "../../../../../../../../core/models/orgUnitSelection";
import {LowestOrgUnitLevel, OrgUnitLevels,} from "../../../../../../../../core/state/orgUnit";
import FullPageError from "../../../../../../../../shared/Components/Errors/FullPageError";
import ModalLoader from "../../../../../../../../shared/Components/Loaders/ModalLoader";
import {getDataSourcesDisplayName} from "../../../../../../../../shared/utils/utils";
import ChartAnalysis from "./Components/ChartAnalysis";
import {DataSourceState, DataState} from "./state/data";
import {LayoutState} from "./state/layout";
import {orgUnitSelectorOptionOnCell, OrgUnitState} from "./state/orgUnit";
import {cellPeriodOptionAtom, PeriodState} from "./state/period";

const DictionaryAnalysis = React.lazy(() =>
    import("./Components/DictionaryAnalysis")
);
const DimensionsSelector = React.lazy(() =>
    import("./Components/DimensionsSelector")
);
const TableAnalysis = React.lazy(() => import("./Components/TableAnalysis"));

const viewTypes = [
    {
        displayName: i18n.t("Table"),
        name: "table",
        icon: <TableChartIcon/>,
        component: TableAnalysis,
    },
    {
        displayName: i18n.t("Chart"),
        name: "chart",
        icon: <ChartIcon/>,
        component: ChartAnalysis,
    },
    {
        displayName: i18n.t("Dictionary"),
        name: "dictionary",
        icon: <DescriptionIcon/>,
        component: DictionaryAnalysis,
    },
];


export default function TableCellAnalysis({
                                              onClose,
                                              dataHolder,
                                              orgUnit,
                                              period,
                                          }) {
    const dataState = useRecoilValueLoadable(DataState);
    const orgUnitLevels = useRecoilValue(OrgUnitLevels);
    const [viewType, setViewType] = useState(viewTypes[0]);
    const dataSources = dataHolder?.dataSources;
    const SelectedView = viewType.component;
    const resetPeriodOptionsCell = useResetRecoilState(cellPeriodOptionAtom);
    const resetOrgUnitOptionCell = useSetRecoilState(orgUnitSelectorOptionOnCell)


    const setStates = useRecoilCallback(
        ({set, snapshot}) =>
            () => {
                const orgUnitOptionValue = snapshot.getLoadable(orgUnitSelectorOptionOnCell).contents;
                const lowestOrgUnitLevel = snapshot.getLoadable(LowestOrgUnitLevel).contents;

                function orgUnitUpdateSelector() {
                    const orgUnitSelection = new OrgUnitSelection({orgUnits: [orgUnit]})
                    if (orgUnitOptionValue) {
                        const newOrgUnitSelection = cloneDeep(orgUnitSelection);
                        const currentOrgUnitLevel = get(orgUnitSelection, ['orgUnits', 0, 'level']);

                        if (currentOrgUnitLevel < lowestOrgUnitLevel.level) {
                            const orgUnitCurrentUserBelowLevels = find(orgUnitLevels, function (level) {
                                return level.level === (currentOrgUnitLevel + 1)
                            });
                            newOrgUnitSelection['levels'] = [orgUnitCurrentUserBelowLevels.id];
                        } else {
                            return orgUnitSelection;
                        }
                        return newOrgUnitSelection;
                    } else {

                        return orgUnitSelection;
                    }

                }

                if (orgUnitOptionValue) {
                    set(LayoutState, {
                        column: ["dx"],
                        row: ["ou"],
                        filter: ["pe"]
                    })
                }

                set(DataSourceState, dataSources);
                set(OrgUnitState, orgUnitUpdateSelector());
                set(PeriodState, {periods: [period]});
            },
        [dataSources, orgUnit, orgUnitLevels, period]
    );

    const resetStates = useRecoilCallback(
        ({reset}) =>
            () => {
                reset(OrgUnitState);
                reset(PeriodState);
                reset(LayoutState);
                reset(DataSourceState);

            },

        []
    );


    useEffect(() => {
        setStates();
        return () => {
            resetStates();
            resetPeriodOptionsCell()
            resetOrgUnitOptionCell(false)

        };
    }, [dataSources, orgUnit, period]);

    return (
        <Modal className="large-modal h-100" position="middle" onClose={onClose} large>
            <ModalContent>
                <div style={{overflow: "hidden", height: "72vh"}} className="h-100 w-100 column flex-1 ">
                    <DimensionsSelector/>
                    <h3 className="pt-8">{getDataSourcesDisplayName(dataSources)}</h3>
                    <Suspense fallback={<ModalLoader/>}>
                        <div
                            style={{
                                flex: 1,
                                overflow: "auto",
                                margin: "16px 0",
                                height: "100%"
                            }}
                        >
                            {dataState.state === "hasError" && (
                                <FullPageError error={dataState.contents}/>
                            )}
                            {dataState.state === "loading" && <ModalLoader/>}
                            {dataState.state === "hasValue" && <SelectedView/>}
                        </div>
                    </Suspense>
                </div>
            </ModalContent>
            <ModalActions>
                <div className="row space-between align-items-center">
                    <div>
                        {viewTypes?.map((type) => (
                            <Chip
                                selected={type?.name === viewType?.name}
                                onClick={() => setViewType(type)}
                                key={type?.name}
                                icon={type?.icon}
                            >
                                {type?.displayName}
                            </Chip>
                        ))}
                    </div>
                    <Button onClick={onClose}>{i18n.t('Cancel')}</Button>
                </div>
            </ModalActions>
        </Modal>
    );
}

TableCellAnalysis.propTypes = {
    dataHolder: PropTypes.object.isRequired,
    orgUnit: PropTypes.object.isRequired,
    period: PropTypes.object.isRequired,
    onClose: PropTypes.func.isRequired,
};
