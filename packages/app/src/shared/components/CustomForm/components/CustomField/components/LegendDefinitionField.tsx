import { Field, Input, Popover } from "@dhis2/ui";
import PropTypes from "prop-types";
import React, { useState } from "react";
import { SketchPicker } from "react-color";
import classes from "../CustomField.module.css";
import { uid } from "../../../../../utils";

function ColorPickerPopper({ reference, value, onClose, onChange }: any) {
	return (
		<Popover
			reference={reference}
			placement="auto"
			strategy="fixed"
			className="popper"
			onClickOutside={onClose}
		>
			<SketchPicker
				color={{ hex: value }}
				onChange={(color: any) => {
					onChange(color.hex);
					onClose();
				}}
			/>
		</Popover>
	);
}

ColorPickerPopper.propTypes = {
	reference: PropTypes.object,
	value: PropTypes.string,
	onChange: PropTypes.func,
	onClose: PropTypes.func,
};

export default function LegendDefinitionField({
	name,
	label,
	value,
	onChange,
}: any) {
	const { color, name: legendName, id } = value ?? {};
	const [reference, setReference] = useState<any>(undefined);

	const onColorChange = (color: any) => {
		onChange({
			name,
			value: {
				...value,
				id: id ?? uid(),
				color,
			},
		});
	};

	const onNameChange = (newName: any) => {
		onChange({
			name,
			value: {
				...value,
				id: id ?? uid(),
				name: newName.value,
			},
		});
	};

	return (
		<Field name={name} label={label} value={value}>
			<div id={name} className={classes["legend-definition-container"]}>
				<div
					id={`color-selector-btn-${name}`}
					onClick={(e) => setReference(e.currentTarget)}
					style={{ background: color, borderColor: "#D5DDE5" }}
					className={classes["legend-color"]}
				>
					{color}
				</div>
				<div className={classes["legend-input"]}>
					<Input
						dataTest={`legend-definition-text-${name}`}
						onChange={onNameChange}
						value={legendName}
					/>
				</div>
			</div>
			{reference && (
				<ColorPickerPopper
					onClose={() => setReference(undefined)}
					reference={reference}
					value={value?.color}
					onChange={onColorChange}
				/>
			)}
		</Field>
	);
}

LegendDefinitionField.propTypes = {
	name: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired,
	label: PropTypes.string,
	value: PropTypes.object,
};
