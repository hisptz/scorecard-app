import i18n from "@dhis2/d2-i18n";
import {OrgUnitSelectorModal} from "@hisptz/react-ui";
import OrgUnitIcon from "@material-ui/icons/AccountTree";
import { clone, find } from "lodash";
import React, {useEffect, useMemo, useState} from "react";
import {useRecoilState, useRecoilValue} from "recoil";
import {OrgUnitGroups, OrgUnitLevels,} from "../../../../../../../../../../../core/state/orgUnit";
import getSelectedOrgUnitSelectionDisplay from "../../../../../../../../../../../shared/utils/orgUnit";
import {OrgUnitState} from "../../../state/orgUnit";
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

z
function orgUnitupdateSelctor(){
    const newOrgUnitSelection = clone(orgUnitSelection);
  const currentUserLevel =  orgUnitSelection['orgUnits'][0]['levels'];
  console.log("currentUserLevel",orgUnitSelection);
//   if(currentUserLevel > 1){
//   const orgUnitCurrentUserBelowLevels = find(orgUnitLevels, function (level) {
// return level.level === (currentUserLevel - 1)
//       });
//       console.log("orjlajf ",orgUnitCurrentUserBelowLevels)
//     // newOrgUnitSelection['levels'] = [orgUnitCurrentUserBelowLevels.id];
//   }else{
//     const orgUnitCurrentUserBelowLevels = find(orgUnitLevels, function (level) {
//         console.log("levels ",currentUserLevel)
//         return level['level'] === currentUserLevel
//               });
//               console.log("orjlajf ",orgUnitCurrentUserBelowLevels)
//     // newOrgUnitSelection[0]['levels'] = [orgUnitCurrentUserBelowLevels.id];
//   }
return newOrgUnitSelection;
}
useEffect(() => {
    console.log("oorgn units  ",orgUnitupdateSelctor())
  }, [orgUnitSelectionDisplay])



    return (
        <div className="pr-16" style={{width: "30%"}}>
            <SelectionWrapper
                label={i18n.t("Organisation Unit(s)")}
                icon={OrgUnitIcon}
                onClick={setSelectorOpen}
                selectedItems={orgUnitSelectionDisplay}
            />
            {
                selectorOpen && <OrgUnitSelectorModal
                    showGroups
                    showLevels
                    showUserOptions
                    onClose={() => setSelectorOpen(false)}
                    value={orgUnitSelection}
                    hide={!selectorOpen} onUpdate={(selection) => {
                    setSelectorOpen(false);
                    onChange(selection);
                }
                }/>
            }
        </div>
    );
}
