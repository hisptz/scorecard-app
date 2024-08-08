import { createContext, ReactNode, useContext } from "react";
import { ScorecardConfig } from "@hisptz/dhis2-analytics";
import i18n from "@dhis2/d2-i18n";

const ScorecardConfigContext = createContext<ScorecardConfig | null>(null);

export function useScorecardConfigFromContext() {
	const config = useContext(ScorecardConfigContext);
	if (!config) {
		throw Error(i18n.t("Could not get scorecard config"));
	}

	return config;
}

export function ScorecardConfigProvider({
	children,
	config,
}: {
	children: ReactNode;
	config: ScorecardConfig;
}) {
	return (
		<ScorecardConfigContext.Provider value={config}>
			{children}
		</ScorecardConfigContext.Provider>
	);
}
