import i18n from "@dhis2/d2-i18n";
import React from "react";
import { useRecoilState } from "recoil";
import OrgUnitSelection from "../../../../../../../../core/models/orgUnitSelection";
import { ScorecardConfigDirtyState } from "../../../../../../../../core/state/scorecard";
import OrgUnitFilter from "../../../../../../../../shared/Components/OrgUnitFilter";

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
        <OrgUnitFilter onUpdate={onSetOrgUnit} value={organisationUnit} />
      </div>
    </div>
  );
}
