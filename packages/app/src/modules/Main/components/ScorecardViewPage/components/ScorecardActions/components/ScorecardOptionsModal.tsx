import i18n from "@dhis2/d2-i18n";
import {
	Button,
	ButtonStrip,
	Field,
	Modal,
	ModalActions,
	ModalContent,
	ModalTitle,
	Radio,
} from "@dhis2/ui";
import { AverageDisplayType } from "@scorecard/shared";
import React from "react";
import { useScorecardState } from "../../../state/state";
import { FormProvider, useController, useForm } from "react-hook-form";
import { ScorecardViewOptions } from "@hisptz/dhis2-analytics";
import { RHFCheckboxField } from "@hisptz/dhis2-ui";

function AverageDisplayTypeField() {
	const { field, fieldState } = useController<ScorecardViewOptions>({
		name: "averageDisplayType",
	});

	return (
		<Field
			validationText={fieldState.error?.message}
			error={!!fieldState.error}
			name="averageDisplayType"
		>
			<div className="column average-options">
				<Radio
					checked={field.value === AverageDisplayType.ALL}
					value={AverageDisplayType.ALL}
					onChange={({ value }) => field.onChange(value)}
					name={AverageDisplayType.ALL}
					label={i18n.t("All")}
				/>
				<Radio
					checked={field.value === AverageDisplayType.BELOW_AVERAGE}
					value={AverageDisplayType.BELOW_AVERAGE}
					onChange={({ value }) => field.onChange(value)}
					name={AverageDisplayType.BELOW_AVERAGE}
					label={i18n.t("Below Average")}
				/>
				<Radio
					checked={field.value === AverageDisplayType.ABOVE_AVERAGE}
					value={AverageDisplayType.ABOVE_AVERAGE}
					onChange={({ value }) => field.onChange(value)}
					name={AverageDisplayType.ABOVE_AVERAGE}
					label={i18n.t("Above Average")}
				/>
			</div>
		</Field>
	);
}

export interface ScorecardOptionsModalProps {
	hide: boolean;
	onClose: () => void;
}

export function ScorecardOptionsModal({
	hide,
	onClose,
}: ScorecardOptionsModalProps) {
	const [state, setState] = useScorecardState();
	const initialOptions = state.options;
	const form = useForm<ScorecardViewOptions>({
		defaultValues: initialOptions,
	});

	const onUpdate = (options: ScorecardViewOptions) => {
		setState((prevState) => ({
			...prevState,
			options: {
				...prevState.options,
				...options,
			},
		}));
		onClose();
	};

	return (
		<FormProvider {...form}>
			<Modal position="middle" hide={hide}>
				<ModalTitle>{i18n.t("Options")}</ModalTitle>
				<ModalContent>
					<div className="column ">
						<h3>{i18n.t("Visibility")}</h3>
						<div className="column visibility-options">
							<RHFCheckboxField
								name="legend"
								label={i18n.t("Legend")}
							/>
							<RHFCheckboxField
								name="title"
								label={i18n.t("Title")}
							/>
							<RHFCheckboxField
								name="itemNumber"
								label={i18n.t("Item Number")}
							/>
							<RHFCheckboxField
								name="emptyRows"
								label={i18n.t("Empty Rows")}
							/>
							<RHFCheckboxField
								name="showHierarchy"
								label={i18n.t("Show Hierarchy")}
							/>
							<RHFCheckboxField
								name="averageColumn"
								label={i18n.t("Average Column")}
							/>
							<RHFCheckboxField
								name="averageRow"
								label={i18n.t("Average Row")}
							/>
							<RHFCheckboxField
								name="highlightedIndicators"
								label={i18n.t("Highlighted Indicators")}
							/>
						</div>
						<h3>{i18n.t("Average")}</h3>
						<AverageDisplayTypeField />
						<h3>{i18n.t("Options")}</h3>
						<div className="column other-options">
							<RHFCheckboxField
								name="arrows"
								label={i18n.t("Arrows")}
							/>
							<RHFCheckboxField
								name="showDataInRows"
								label={i18n.t("Show Data in Rows")}
							/>
						</div>
					</div>
				</ModalContent>
				<ModalActions>
					<ButtonStrip>
						<Button onClick={onClose}>{i18n.t("Cancel")}</Button>
						<Button
							primary
							onClick={() => form.handleSubmit(onUpdate)()}
						>
							{i18n.t("Update")}
						</Button>
					</ButtonStrip>
				</ModalActions>
			</Modal>
		</FormProvider>
	);
}
