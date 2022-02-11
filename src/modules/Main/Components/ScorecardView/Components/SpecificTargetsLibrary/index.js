import i18n from '@dhis2/d2-i18n'
import {Button, Modal, ModalActions, ModalContent, ModalTitle} from '@dhis2/ui'
import {filter, groupBy, head, isEmpty} from "lodash";
import PropTypes from 'prop-types'
import React, {Suspense, useMemo} from "react";
import {useRecoilValue} from "recoil";
import {ScorecardViewState} from "../../../../../../core/state/scorecard";
import {getDataSourcesFromGroups} from "../../../../../../shared/utils/utils";
import {OrgUnitSpecificTargetView, PeriodSpecificTargetView} from "./components/SpecificTargetView";

function SpecificTargetsLibrary() {
    const {dataGroups} = useRecoilValue(ScorecardViewState("dataSelection"))
    const dataSources = useMemo(() => getDataSourcesFromGroups(dataGroups), [dataGroups])
    const specificTargetsDataSourcesByType = useMemo(() => {
        const dataSourcesWithSpecificTargets = filter(dataSources, ds => !isEmpty(ds.specificTargets))
        return groupBy(dataSourcesWithSpecificTargets, ds => head(ds.specificTargets).type)
    }, [dataSources])
    return (
        <div className="column gap-16">
            <div>
                <h3>{i18n.t("Organisation Units Specific targets")}</h3>
                <div>
                    {
                        specificTargetsDataSourcesByType.orgUnit.map(dataSource => <OrgUnitSpecificTargetView
                            key={`${dataSource.id}-orgUnit-specific-target`}
                            specificTarget={head(dataSource.specificTargets)} dataSourceLabel={dataSource.label}/>)
                    }
                </div>
            </div>
            <div>
                <h3>{i18n.t("Period Specific targets")}</h3>
                <div>
                    {
                        specificTargetsDataSourcesByType.period.map(dataSource => <PeriodSpecificTargetView
                            key={`${dataSource.id}-orgUnit-specific-target`}
                            specificTarget={head(dataSource.specificTargets)} dataSourceLabel={dataSource.label}/>)
                    }
                </div>
            </div>
        </div>
    )
}


export default function SpecificTargetsLibraryModal({open, onClose}) {

    return (
        <Modal large position="middle" hide={!open} onClose={onClose}>
            <ModalTitle>Specific Targets Library</ModalTitle>
            <ModalContent>
                <Suspense fallback={<div>Loading...</div>}>
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

