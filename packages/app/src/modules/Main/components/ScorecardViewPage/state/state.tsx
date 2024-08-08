import { createContext, ReactNode, useContext, useState } from "react";
import { ScorecardState } from "@hisptz/dhis2-analytics";
import { ScorecardSetState } from "@hisptz/dhis2-analytics/dist/types/components/Scorecard/components/StateSetProvider";

const ScorecardStateContext = createContext<ScorecardState | null>(null);
const ScorecardSetStateContext = createContext<ScorecardSetState | null>(null);

export function useScorecardState() {
	const scorecardState = useContext(ScorecardStateContext)!;
	const setState = useContext(ScorecardSetStateContext)!;
	return [scorecardState, setState] as [ScorecardState, ScorecardSetState];
}

export function ScorecardStateProvider({
	children,
	initialState,
}: {
	children: ReactNode;
	initialState: ScorecardState;
}) {
	const [scorecardState, setScorecardState] =
		useState<ScorecardState>(initialState);

	return (
		<ScorecardStateContext.Provider value={scorecardState}>
			<ScorecardSetStateContext.Provider value={setScorecardState}>
				{children}
			</ScorecardSetStateContext.Provider>
		</ScorecardStateContext.Provider>
	);
}
