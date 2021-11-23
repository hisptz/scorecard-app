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
        <div className="column h-100">
            <div className="pt-16 pb-16">
                <h3>{i18n.t("Organisation Unit")}</h3>
            </div>
            <div style={{minHeight: 400}} className="access-org-unit-filter h-100">
                <Suspense fallback={<ContainerLoader height={400}/>}>
                    <OrgUnitSelector showGroups showLevels showUserOptions onUpdate={onSetOrgUnit}
                                     value={organisationUnit}/>
                </Suspense>
            </div>
        </div>
    );
}
