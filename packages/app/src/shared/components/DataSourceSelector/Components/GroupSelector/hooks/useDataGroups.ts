import { useDataEngine } from "@dhis2/app-runtime";
import { useEffect, useState } from "react";

export default function useDataGroups(initialSelectedDataType: any) {
	const [data, setData] = useState();
	const [loading, setLoading] = useState<boolean>();
	const [error, setError] = useState<any>();
	const engine = useDataEngine();

	useEffect(() => {
		async function fetch() {
			if (initialSelectedDataType) {
				setLoading(true);
				try {
					const response = await initialSelectedDataType.getGroups(engine);
					if (response) {
						setData(response);
					}
				} catch (e) {
					setError(e);
				}
				setLoading(false);
			}
		}

		fetch();
	}, [engine, initialSelectedDataType]);

	return { loading, groups: data, error };
}
