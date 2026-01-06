import i18n from "@dhis2/d2-i18n";
import { find, forEach, isEmpty, set } from "lodash";
import { OrgUnitSelection } from "@hisptz/dhis2-utils";

export function getSelectedOrgUnitSelectionDisplay(
	orgUnitSelection: OrgUnitSelection,
	{
		orgUnitLevels,
		orgUnitGroups
	}: { orgUnitLevels: any[]; orgUnitGroups: any[] }
): Array<{ name: string; id: string }> {
	const {
		orgUnits,
		levels,
		groups,
		userOrgUnit,
		userSubUnit,
		userSubX2Unit
	} = orgUnitSelection;

	const display: Array<{ name: string; id: string }> = [
		...(orgUnits?.map(({ id, displayName: name }) => ({ id, name })) ?? [])
	];

	if (userOrgUnit) {
		display.push({
			name: i18n.t("User Organisation Unit"),
			id: "USER_ORGUNIT"
		});
	}

	if (userSubUnit) {
		display.push({
			name: i18n.t("User Sub-units"),
			id: "USER_ORGUNIT_CHILDREN"
		});
	}

	if (userSubX2Unit) {
		display.push({
			name: i18n.t("User Sub-x2-units"),
			id: "USER_ORGUNIT_GRANDCHILDREN"
		});
	}

	if (!isEmpty(levels)) {
		display.push({
			name: `Levels: ${levels?.map((level) => {
				const levelObject = find(orgUnitLevels, ["id", level]) ?? {};
				return levelObject.displayName;
			})}`,
			id: "levels"
		});
	}
	if (!isEmpty(groups)) {
		display.push({
			name: `Groups: ${groups?.map(
				(group) => find(orgUnitGroups, ["id", group]).displayName
			)}`,
			id: "groups"
		});
	}

	return display;
}

export function getOrgUnitSelectionFromIds(ous: string[]): OrgUnitSelection {
	const orgUnitSelection: OrgUnitSelection = {
		orgUnits: []
	};
	forEach(ous, (ou) => {
		if (ou === "USER_ORGUNIT") {
			set(orgUnitSelection, ["userOrgUnit"], true);
		} else if (ou === "USER_ORGUNIT_CHILDREN") {
			set(orgUnitSelection, ["userSubUnit"], true);
		} else if (ou === "USER_ORGUNIT_GRANDCHILDREN") {
			set(orgUnitSelection, ["userSubX2Unit"], true);
		} else if (ou.includes("LEVEL")) {
			const levels = [...(orgUnitSelection.levels ?? [])];
			levels.push(ou.replace("LEVEL-", ""));
			set(orgUnitSelection, ["levels"], levels);
		} else if (ou.includes("GROUP")) {
			const groups = [...(orgUnitSelection.groups ?? [])];
			groups.push(ou.replace("GROUP-", ""));
			set(orgUnitSelection, ["groups"], groups);
		} else {
			const orgUnits = [...(orgUnitSelection.orgUnits ?? [])];
			orgUnits.push({
				id: ou,
				children: [],
				path: ""
			});
			set(orgUnitSelection, ["orgUnits"], orgUnits);
		}
	});
	return orgUnitSelection;
}

export function getOrgUnitIdsFromOrgUnitSelection(
	orgUnitSelection: OrgUnitSelection
): string[] {
	const orgUnits = [];
	if (orgUnitSelection.userOrgUnit) {
		orgUnits.push("USER_ORGUNIT");
	}

	if (orgUnitSelection.userSubUnit) {
		orgUnits.push("USER_ORGUNIT_CHILDREN");
	}

	if (orgUnitSelection.userSubX2Unit) {
		orgUnits.push("USER_ORGUNIT_GRANDCHILDREN");
	}
	if (!isEmpty(orgUnitSelection.levels)) {
		forEach(orgUnitSelection.levels, (level) =>
			orgUnits.push(`LEVEL-${level}`)
		);
	}
	if (!isEmpty(orgUnitSelection.groups)) {
		forEach(orgUnitSelection.groups, (level) =>
			orgUnits.push(`GROUP-${level}`)
		);
	}

	return [
		...orgUnits,
		...(orgUnitSelection?.orgUnits?.map((ou) => `${ou.id}`) ?? [])
	];
}
