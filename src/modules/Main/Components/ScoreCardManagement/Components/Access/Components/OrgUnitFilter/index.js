import i18n from "@dhis2/d2-i18n";
import {OrgUnitSelector} from '@hisptz/react-ui'
import React, {Suspense} from "react";
import {useRecoilState} from "recoil";
import OrgUnitSelection from "../../../../../../../../core/models/orgUnitSelection";
import {ScorecardConfigDirtyState} from "../../../../../../../../core/state/scorecard";
import ContainerLoader from "../../../../../../../../shared/Components/Loaders/ContainerLoader";

export default function OrgUnit() {
    const [organisationUnit, setOrganisationUnit] = useRecoilState(
        ScorecardConfigDirtyState("orgUnitSelection")
    );

    const onSetOrgUnit = (values) => {
        setOrganisationUnit((prevState) =>
            OrgUnitSelection.setObject(prevState, values)
        );
    };

    return (
        <div className="column">
            <div className="pt-16 pb-16">
                <h3>{i18n.t("Organisation Unit")}</h3>
            </div>
            <div className="access-org-unit-filter">
                <Suspense fallback={<ContainerLoader/>}>
                    <OrgUnitSelector showGroups showLevels showUserOptions onUpdate={onSetOrgUnit}
                                     value={organisationUnit}/>
                </Suspense>
            </div>
        </div>
    );
}
