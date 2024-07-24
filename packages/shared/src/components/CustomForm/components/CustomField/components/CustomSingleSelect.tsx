import { SingleSelectField, SingleSelectOption } from "@dhis2/ui";
import PropTypes from "prop-types";
import React from "react";

export default function CustomSingleSelect({
	options,
	onChange,
	value,
	name,
	...props
}: any) {
	return (
		<SingleSelectField
			selected={value}
			onChange={({ selected }: any) => onChange({ name, value: selected })}
			{...props}
		>
			{options?.map(({ label, value }: any) => (
				<SingleSelectOption label={label} value={value} key={value} />
			))}
		</SingleSelectField>
	);
}

CustomSingleSelect.propTypes = {
	name: PropTypes.string.isRequired,
	options: PropTypes.arrayOf(PropTypes.object).isRequired,
	onChange: PropTypes.func.isRequired,
	value: PropTypes.any,
};
