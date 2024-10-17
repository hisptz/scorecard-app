import i18n from "@dhis2/d2-i18n";
import { colors, IconError24 } from "@dhis2/ui";
import { OrgUnitSelector } from "@hisptz/dhis2-ui";
import { ContainerLoader } from "@scorecard/shared";
import React, { Suspense } from "react";
import { useController } from "react-hook-form";
import { ScorecardConfig } from "@hisptz/dhis2-scorecard";


export default function OrgUnit() {
	const { field, fieldState } = useController<ScorecardConfig, `orgUnitSelection`>({
		name: "orgUnitSelection"
	});

	return (
		<div className="column h-100">
			<div className="pt-16 pb-16">
				<h3>{i18n.t("Organisation Unit")}</h3>
			</div>
			{fieldState.error && (
				<div
					style={{
						display: "flex",
						gap: 8,
						alignItems: "center",
						padding: "8px 0",
						color: colors.red500
					}}
				>
					<IconError24 />
					{fieldState.error?.message}
				</div>
			)}
			<div
				style={{ minHeight: 400 }}
				className="access-org-unit-filter h-100"
			>
				<Suspense fallback={<ContainerLoader height={400} />}>
					<OrgUnitSelector
						showGroups
						showLevels
						showUserOptions
						onUpdate={field.onChange}
						value={field.value ?? { orgUnits: [] }}
					/>
				</Suspense>
			</div>
		</div>
	);
}
