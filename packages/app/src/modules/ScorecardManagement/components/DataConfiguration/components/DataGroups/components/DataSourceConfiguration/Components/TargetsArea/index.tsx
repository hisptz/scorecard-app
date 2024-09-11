import i18n from "@dhis2/d2-i18n";
import { RHFCheckboxField } from "@hisptz/dhis2-ui";
import { DHIS2ValueTypes } from "@scorecard/shared";
import React from "react";
import { useWatch } from "react-hook-form";
import TargetsField from "./components/TargetsField";
import { SpecificFieldsSelector } from "./components/SpecificFieldsSelector";


export default function TargetsArea({ path }: { path: string }) {

	const areSpecificTargetsSet = useWatch({ name: `${path}.specificTargetsSet` });


	return (
		<div style={{ gap: 16 }} className="column gap-16">
			<RHFCheckboxField
				valueType={DHIS2ValueTypes.TRUE_ONLY.name}
				label={i18n.t("Set Specific Targets")}
				name={`${path}.specificTargetsSet`}
			/>
			{areSpecificTargetsSet ? (
				<SpecificFieldsSelector path={path} />
			) : (
				<div className="row">
					<div className="column w-100 legend-settings-area">
						<TargetsField name={`${path}.legends`} path={path} />
					</div>
				</div>
			)}
		</div>
	);
}
