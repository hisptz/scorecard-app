import i18n from "@dhis2/d2-i18n";
import { find, isEmpty } from "lodash";

export default function getSelectedOrgUnitSelectionDisplay(
  orgUnitSelection,
  { orgUnitLevels, orgUnitGroups }
) {
  const { orgUnits, levels, groups, userOrgUnit, userSubUnit, userSubX2Unit } =
    orgUnitSelection;

  const display = [...orgUnits];

  if (userOrgUnit) {
    display.push({
      name: i18n.t("User Organisation Unit"),
    });
  }

  if (userSubUnit) {
    display.push({
      name: i18n.t("User Sub-units"),
    });
  }

  if (userSubX2Unit) {
    display.push({
      name: i18n.t("User Sub-x2-units"),
    });
  }

  if (!isEmpty(levels)) {
    display.push({
      name: `Levels: ${levels?.map((level) => {
        const levelObject = find(orgUnitLevels, ["id", level]) ?? {};
        return levelObject.displayName;
      })}`,
    });
  }
  if (!isEmpty(groups)) {
    display.push({
      name: `Groups: ${groups?.map(
        (group) => find(orgUnitGroups, ["id", group]).displayName
      )}`,
    });
  }

  return display;
}
