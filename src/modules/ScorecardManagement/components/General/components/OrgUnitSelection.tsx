import { useController } from "react-hook-form";
import { ScorecardConfig } from "@hisptz/dhis2-scorecard";
import { OrgUnitObjectSelectField } from "@hisptz/dhis2-ui";
import i18n from "@dhis2/d2-i18n";

export function ScorecardOrgUnitSelection() {
	const { field, fieldState } = useController<
		ScorecardConfig,
		"orgUnitSelection"
	>({
		name: "orgUnitSelection",
	});

	return (
		<OrgUnitObjectSelectField
			label={i18n.t("Default organisation unit")}
			error={fieldState.error?.message}
			value={field.value}
			orgUnitProps={{
				showGroups: true,
				showLevels: true,
				showUserOptions: true,
				searchable: true,
			}}
			onChange={field.onChange}
			name="orgUnitSelection"
		/>
	);
}
