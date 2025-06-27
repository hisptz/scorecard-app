import React, { createContext, useContext, useEffect } from "react";
import { PluginConfig, PluginProps } from "../types";
import { useGetPluginConfig } from "../hooks/config";
import { useNavigate, useParams } from "react-router-dom";
import { FullPageError, FullPageLoader } from "../../shared";

const PluginConfigContext = createContext<PluginConfig | null>(null);


export function usePluginConfig() {
	const config = useContext(PluginConfigContext);

	if (config == null) {
		throw Error("PluginConfig is not initialized. Make sure to wrap your widget in a PluginConfigProvider");
	}

	return config;
}


export function PluginConfigProvider({ children, props }: { children: any, props: PluginProps }) {
	const { config, error, loading, refetch } = useGetPluginConfig(props.dashboardItemId);
	const navigate = useNavigate();
	const { id } = useParams<{ id: string }>();

	useEffect(() => {
		if (config) {
			if (!id) {
				navigate(`${config.scorecardId}`);
			}
		}
	}, [config]);

	if (loading) {
		return (
			<FullPageLoader small />
		);
	}

	if (error && error.details.httpStatusCode !== 404) {
		return (
			<FullPageError resetErrorBoundary={refetch} error={error} />
		);
	}

	return (
		<PluginConfigContext.Provider
			value={{
				props,
				config
			}}>
			{children}
		</PluginConfigContext.Provider>
	);
}

