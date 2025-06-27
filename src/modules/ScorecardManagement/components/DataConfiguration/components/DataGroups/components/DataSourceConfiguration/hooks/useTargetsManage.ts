import { useCallback, useEffect, useMemo, useState } from "react";
import { useFormContext } from "react-hook-form";
import { generateLegendDefaults } from "../../../../../../../../../shared";

export default function useTargetsManage(props: any) {
	const { name, multipleFields } = props ?? {};
	const { setValue, watch, getValues } = useFormContext();
	const onChange = useCallback(
		({ value }: any) => setValue(name, value),
		[name, setValue]
	);

	const [initialHighIsGood, setInitialHighIsGood] = useState(
		getValues(`${name.replace("legends", "highIsGood")}`)
	);
	const [initialWeight, setInitialWeight] = useState(
		getValues(`${name.replace("legends", "weight")}`)
	);

	const highIsGood = watch(`${name.replace("legends", "highIsGood")}`);
	const weight = watch(`${name.replace("legends", "weight")}`);

	const initialValue = watch(name);

	const value = useMemo(
		() =>
			Array.isArray(initialValue)
				? initialValue
				: generateLegendDefaults({
					legendDefinitions: multipleFields, weight, highIsGood
				}),
		[highIsGood, initialValue, multipleFields, weight]
	);

	useEffect(() => {
		if (initialWeight !== weight || initialHighIsGood !== highIsGood) {
			setValue(
				name,
				generateLegendDefaults({
					legendDefinitions: multipleFields, weight, highIsGood
				})
			);
			setInitialHighIsGood(highIsGood);
			setInitialWeight(weight);
		}
	}, [
		highIsGood,
		initialHighIsGood,
		initialWeight,
		multipleFields,
		name,
		setValue,
		value,
		weight
	]);

	useEffect(() => {
		if (!Array.isArray(initialValue)) {
			onChange({
				value
			});
		}
	}, [value, initialValue, onChange]);
}
