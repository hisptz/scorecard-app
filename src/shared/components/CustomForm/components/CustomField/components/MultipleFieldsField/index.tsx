import { Button, Field, IconAdd24, IconDelete24 } from "@dhis2/ui";
import { remove, set } from "lodash";
import React, { useEffect, useState } from "react";
import { FormFieldModel } from "../../../../models";
import { CustomInput } from "../../index";

export default function MultipleFieldsField({
												name,
												value,
												onChange,
												multipleField,
												initialFieldCount,
												multipleFields,
												...props
											}: any) {
	const [fields, setFields] = useState<any>([]);
	useEffect(() => {
		function setInitialFields() {
			if (multipleField) {
				const count = value?.length || initialFieldCount || 1;
				let i = 0;
				const fields = [];
				for (i; i < count; i++) {
					const newField = new FormFieldModel({ ...multipleField });
					set(newField, ["id"], `${newField.id}-${fields.length}`);
					set(newField, ["name"], `${newField.id}-${fields.length}`);
					fields.push(newField);
				}
				setFields(fields);
			}
		}

		setInitialFields();
	}, []);

	const onAddField = () => {
		const newField = new FormFieldModel({ ...multipleField });
		set(newField, ["id"], `${newField.id}-${fields.length}`);
		set(newField, ["name"], `${newField.id}-${fields.length}`);
		setFields([...fields, newField]);
	};

	const onDeleteField = (field: any, index: number) => {
		const temp = [...fields];
		remove(temp, ["id", field.id]);
		const tempValue = value ? [...value] : [];
		tempValue.splice(index, 1);
		onChange({ value: tempValue });
		setFields([...temp]);
	};

	const onFieldValueChange = (index: number, newValue: any) => {
		const tempValue = value ? [...value] : [];
		try {
			tempValue[index] = newValue;
		} catch (e) {
			tempValue.push(newValue);
		}
		onChange({ value: tempValue, name });
	};
	return (
		<Field {...props}>
			<div className="column">
				{multipleField
					? fields.map((field: any, index: number) => {
						const input = {
							name: field.name,
							onChange: (value: any) => onFieldValueChange(index, value),
							value: value?.[index]
						};

						return (
							<div
								key={`${field?.id}-${index}`}
								className="row align-items-center w-100"
							>
								<div className="column w-75">
									<CustomInput
										onChange={(v: any) => onFieldValueChange(index, v)}
										valueType={field.valueType}
										input={input}
									/>
								</div>
								<div className="column w-25">
									{!value?.[index]?.isDefault && (
										<Button
											disabled={index === 0 && fields.length === 1}
											icon={<IconDelete24 />}
											onClick={() => onDeleteField(field, index)}
										>
											Delete
										</Button>
									)}
								</div>
							</div>
						);
					})
					: multipleFields?.map((field: any, index: number) => {
						const input = {
							name: field.name,
							onChange: (value: any) => onFieldValueChange(index, value),
							value: value?.[index]
						};
						return (
							<div
								key={`${field?.id}-${index}`}
								className="row align-items-center w-100"
							>
								<div className="column">
									<CustomInput
										onChange={(v: any) => onFieldValueChange(index, v)}
										valueType={field.valueType}
										input={input}
										{...field}
									/>
								</div>
								{multipleField && (
									<div className="column">
										<Button
											disabled={index === 0 && fields.length === 1}
											icon={<IconDelete24 />}
											onClick={() => onDeleteField(field, index)}
										>
											Delete
										</Button>
									</div>
								)}
							</div>
						);
					})}
				{multipleField && (
					<div className="w-50">
						<Button icon={<IconAdd24 />} onClick={onAddField}>
							Add Item
						</Button>
					</div>
				)}
			</div>
		</Field>
	);
}
