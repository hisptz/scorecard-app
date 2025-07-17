import { createContext, ReactNode, useContext } from "react";
import { ScorecardConfig } from "@hisptz/dhis2-scorecard";
import { useScorecardConfigFromServer } from "./hooks/data";
import { FullPageError, FullPageLoader } from "../../shared";
import { AccessObject } from "@hisptz/dhis2-utils";

const ConfigContext = createContext<
	(ScorecardConfig & { access: AccessObject }) | null
>(null);

export function useConfigContext() {
	return useContext(ConfigContext)!;
}

export function ConfigProvider({ children }: { children: ReactNode }) {
	const { loading, config, error, refetch, access } =
		useScorecardConfigFromServer();
	if (loading) {
		return <FullPageLoader />;
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
		<ConfigContext.Provider
			value={{
				...config,
				access: access,
			}}
		>
			{children}
		</ConfigContext.Provider>
	);
}
