import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from "react";


const DataItemSearchState = createContext<string[]>([]);
const SetDataItemSearchState = createContext<Dispatch<SetStateAction<string[]>> | null>(null);

export function useDataItemSearchState() {
	const dataItemSearchState = useContext(DataItemSearchState);
	const setDataItemSearchState = useContext(SetDataItemSearchState);
	if (!dataItemSearchState || !setDataItemSearchState) {
		throw new Error(`useDataItemSearchState must be used in a DataItemSearchProvider`);
	}
	return [
		dataItemSearchState,
		setDataItemSearchState
	] as const;
}

export function DataItemSearchProvider({ children }: { children: ReactNode }) {
	const [dataItemSearch, setDataItemSearch] = useState<string[]>([]);

	return (
		<DataItemSearchState.Provider value={dataItemSearch}>
			<SetDataItemSearchState.Provider value={setDataItemSearch}>
				{children}
			</SetDataItemSearchState.Provider>
		</DataItemSearchState.Provider>
	);
}
