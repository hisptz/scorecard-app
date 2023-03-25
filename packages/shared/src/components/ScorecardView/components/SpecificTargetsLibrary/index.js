import i18n from '@dhis2/d2-i18n'
import {Button, CircularLoader, Modal, ModalActions, ModalContent, ModalTitle} from '@dhis2/ui'
import {filter, groupBy, head, isEmpty} from "lodash";
import PropTypes from 'prop-types'
import React, {Suspense, useMemo} from "react";
import {useRecoilValue} from "recoil";

import {
    OrgUnitLevelSpecificTargetView,
    OrgUnitSpecificTargetView,
    PeriodSpecificTargetView
} from "./components/SpecificTargetView";
import classes from "./SpecificTargetsLibrary.module.css"
import {ScorecardViewState} from "../../../../state";
import {getDataSourcesFromGroups} from "../../../../utils";

export function SpecificTargetsLibrary() {
    const {dataGroups} = useRecoilValue(ScorecardViewState("dataSelection"))
    const dataSources = useMemo(() => getDataSourcesFromGroups(dataGroups), [dataGroups])
    const specificTargetsDataSourcesByType = useMemo(() => {
        const dataSourcesWithSpecificTargets = filter(dataSources, ds => ds.specificTargetsSet)
        const data = groupBy(filter(dataSourcesWithSpecificTargets, ds => !isEmpty(ds.specificTargets)), ds => head(ds.specificTargets)?.type)
        data["orgUnitLevel"] = dataSourcesWithSpecificTargets.filter(ds => isEmpty(ds.specificTargets))
        return data;
    }, [dataSources])
    return (
        <>
            <div className="column gap-16">
                {
                    !isEmpty(specificTargetsDataSourcesByType?.orgUnit) && <div>
                        <h3>{i18n.t("Organisation Units Specific targets")}</h3>
                        <div className="row gap-16">
                            {
                                specificTargetsDataSourcesByType?.orgUnit?.map(dataSource => <>
                                    <OrgUnitSpecificTargetView
                                        key={`${dataSource.id}-orgUnit-specific-target`}
                                        specificTarget={head(dataSource.specificTargets)}
                                        dataSourceLabel={dataSource.label}/>
                                    <div className="page-break"/>
                                </>)
                            }
                        </div>
                        <div className="page-break"/>
                    </div>
                }
                {
                    !isEmpty(specificTargetsDataSourcesByType?.period) && <div>
                        <h3>{i18n.t("Period Specific targets")}</h3>
                        <div className="row gap-16">
                            {
                                specificTargetsDataSourcesByType?.period?.map(dataSource => <>
                                    <PeriodSpecificTargetView
                                        key={`${dataSource.id}-orgUnit-specific-target`}
                                        specificTarget={head(dataSource.specificTargets)}
                                        dataSourceLabel={dataSource.label}/>
                                    <div className="page-break"/>
                                </>)
                            }
                        </div>
                        <div className="page-break"/>
                    </div>
                }
                {
                    !isEmpty(specificTargetsDataSourcesByType?.orgUnitLevell) && <div>
                        <h3>{i18n.t("Organisation unit level targets")}</h3>
                        <div className="column gap-16">
                            {
                                specificTargetsDataSourcesByType?.orgUnitLevel?.map(dataSource =>
                                    <OrgUnitLevelSpecificTargetView
                                        key={`${dataSource.id}-orgUnit-specific-target`}
                                        legends={dataSource.legends} dataSourceLabel={dataSource.label}/>)
                            }
                        </div>
                        <div className="page-break"/>
                    </div>
                }
            </div>
        </>
    )
}


export default function SpecificTargetsLibraryModal({open, onClose}) {

    return (
        <Modal onClose={onClose} className={classes["specific-targets-lib"]} large position="middle" hide={!open}>
            <ModalTitle>Specific Targets Library</ModalTitle>
            <ModalContent>
                <Suspense fallback={<div className="column align-items-center justify-content-center"
                                         style={{height: "60vh", width: "100%",}}><CircularLoader small/></div>}>
                    <SpecificTargetsLibrary/>
                </Suspense>
            </ModalContent>
            <ModalActions>
                <Button onClick={onClose}>{i18n.t("Cancel")}</Button>
            </ModalActions>
        </Modal>
    )
}

SpecificTargetsLibraryModal.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired
};

