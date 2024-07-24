import { find, flatten, map } from "lodash";

export function getDataSelectionGroupMembers(tableConfiguration: any) {
	const dxDataSelection = find(tableConfiguration.dataSelections, [
		"dimension",
		"dx",
	]);

	return flatten(
		map(dxDataSelection ? dxDataSelection.groups || [] : [], (dxGroup) => {
			return map(dxGroup.members, (member) => [dxGroup.id, member.id]);
		}),
	);
}
