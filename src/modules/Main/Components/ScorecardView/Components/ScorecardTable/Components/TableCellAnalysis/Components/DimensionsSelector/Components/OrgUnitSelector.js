import i18n from "@dhis2/d2-i18n";
import OrgUnitIcon from "@material-ui/icons/AccountTree";
import React, { useMemo, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  OrgUnitGroups,
  OrgUnitLevels,
} from "../../../../../../../../../../../core/state/orgUnit";
import OrgUnitSelectorModal from "../../../../../../../../../../../shared/Components/OrgUnitSelectorModal";
import getSelectedOrgUnitSelectionDisplay from "../../../../../../../../../../../shared/utils/orgUnit";
import { OrgUnitState } from "../../../state/orgUnit";
import SelectionWrapper from "./SelectionWrapper";

export default function OrgUnitSelector() {
  const [orgUnitSelection, onChange] = useRecoilState(OrgUnitState);
  const orgUnitLevels = useRecoilValue(OrgUnitLevels);
  const orgUnitGroups = useRecoilValue(OrgUnitGroups);
  const [selectorOpen, setSelectorOpen] = useState(false);

  const orgUnitSelectionDisplay = useMemo(
    () =>
      getSelectedOrgUnitSelectionDisplay(orgUnitSelection, {
        orgUnitGroups,
        orgUnitLevels,
      }),
    [orgUnitGroups, orgUnitLevels, orgUnitSelection]
  );

  return (
    <div className="pr-16" style={{ width: "30%" }}>
      <SelectionWrapper
        label={i18n.t("Organisation Unit(s)")}
        icon={OrgUnitIcon}
        onClick={setSelectorOpen}
        selectedItems={orgUnitSelectionDisplay}
      />
      {selectorOpen && (
        <OrgUnitSelectorModal
          onClose={() => setSelectorOpen(false)}
          onSelect={onChange}
          initialValue={orgUnitSelection}
        />
      )}
    </div>
  );
}
