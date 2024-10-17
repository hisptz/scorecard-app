import { createContext, ReactNode, useContext } from "react";
import { ScorecardConfig } from "@hisptz/dhis2-scorecard";
import { useScorecardConfigFromServer } from "./hooks/data";
import { FullPageError, FullPageLoader } from "@scorecard/shared";

const ConfigContext = createContext<ScorecardConfig | null>(null);

export function useConfigContext() {
	return useContext(ConfigContext)!;
}

export function ConfigProvider({ children }: { children: ReactNode }) {
	const { loading, config, error, refetch } = useScorecardConfigFromServer();
	if (loading) {
		return (
			<FullPageLoader />
		);
	}
	if (error) {
		return (
			<FullPageError
				error={error}
				resetErrorBoundary={() => {
					refetch();
				}}
			/>
		);
	}
	if (!config) {
		return (
			<FullPageError
				resetErrorBoundary={() => {
					refetch();
				}}
				error={Error("Could not get information about the scorecard")}
			/>
		);
	}

	return (
		<ConfigContext.Provider value={config}>
			{children}
		</ConfigContext.Provider>
	);

}
