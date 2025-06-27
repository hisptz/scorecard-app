import i18n from "@dhis2/d2-i18n";
import { Button, ButtonStrip } from "@dhis2/ui";
import React from "react";
import { RHFTextInputField } from "@hisptz/dhis2-ui";

export default function EditTitle({
									  index,
									  onClose
								  }: { index: number; onClose: () => void }) {

	return (
		<div className="row space-between w-100">
			<div
				onClick={(event) => event.stopPropagation()}
				className="column"
			>
				<RHFTextInputField name={`dataSelection.dataGroups.${index}.title`} />
			</div>
			<div className="column ">
				<ButtonStrip end>
					<Button onClick={(_, event) => {
						event.stopPropagation();
						onClose();
					}}>
						{i18n.t("Save")}
					</Button>
				</ButtonStrip>
			</div>
		</div>
	);
}
