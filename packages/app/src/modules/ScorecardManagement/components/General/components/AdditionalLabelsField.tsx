import { useFieldArray } from "react-hook-form";
import { Button, Field, InputField } from "@dhis2/ui";
import i18n from "@dhis2/d2-i18n";
import { RHFTextInputField } from "@hisptz/dhis2-ui";
import { useState } from "react";
import { IconAdd24, IconDelete24 } from "@dhis2/ui-icons";


export function AdditionalLabelsField() {
	const [addFieldValue, setAddFieldValue] = useState<string | undefined>();
	const { fields, append, remove } = useFieldArray({
		name: "additionalLabels"
	});

	const onAdd = () => {
		if (addFieldValue) {
			append(addFieldValue as string);
			setAddFieldValue(undefined);
		}
	};

	return (
		<Field label={i18n.t("Additional labels")}>
			<div style={{ gap: 24 }} className="column">
				<div style={{ gap: 8 }} className="column">
					{
						fields.map((field, i) => {
							return (
								<div key={field.id} style={{ gap: 8 }} className="row align-items-center">
									<div style={{ flex: 1 }}>
										<RHFTextInputField name={`additionalLabels.${i}`} />
									</div>
									<Button onClick={() => remove(i)} icon={<IconDelete24 />}>{i18n.t("Delete")}</Button>
								</div>
							);
						})
					}
				</div>
				<div style={{ gap: 8 }} className="row align-items-end">
					<div style={{ flex: 1 }}>
						<InputField label={i18n.t("Add new label")} value={addFieldValue} onChange={({ value }: { value?: string }) => setAddFieldValue(value)} />
					</div>
					<Button onClick={onAdd} disabled={!addFieldValue} icon={<IconAdd24 />}>{i18n.t("Add")}</Button>
				</div>
			</div>
		</Field>
	);
}
