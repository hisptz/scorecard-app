import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from "react";


interface Selection {
	groupIndex: number;
	holderIndex: number;
}

const SelectedDataState = createContext<Selection | null>(null);
const SetSelectedDataState = createContext<Dispatch<SetStateAction<Selection | null>> | null>(null);


export function useSelectedData() {
	return useContext(SelectedDataState);
}

export function useSetSelectedDataState() {
	const setSelectedData = useContext(SetSelectedDataState);
	if (!setSelectedData) {
		throw new Error(`useSelectedDataState must be used in a SelectedDataStateProvider`);
	}
	return setSelectedData;
}

export function useClearSelectedDataState() {
	const setSelectedData = useSetSelectedDataState();
	return () => {
		setSelectedData(null);
	};
}

export function useSelectedDataState() {
	const selectedData = useContext(SelectedDataState);
	const setSelectedData = useContext(SetSelectedDataState);
	if (!setSelectedData) {
		throw new Error(`useSelectedDataState must be used in a SelectedDataStateProvider`);
	}

	return [
		selectedData,
		setSelectedData
	] as const;
}

export function SelectedDataStateProvider({ children }: { children: ReactNode }) {
	const [selectedData, setSelectedData] = useState<Selection | null>(null);

	return (
		<SelectedDataState.Provider value={selectedData}>
			<SetSelectedDataState.Provider value={setSelectedData}>
				{children}
			</SetSelectedDataState.Provider>
		</SelectedDataState.Provider>
	);
}
