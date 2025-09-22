import React, { createContext, useContext, useEffect } from "react";
import { PluginConfig, PluginProps } from "../types";
import { useGetPluginConfig } from "../hooks/config";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { FullPageError, FullPageLoader } from "../../shared";
import { isEmpty } from "lodash";

const PluginConfigContext = createContext<PluginConfig | null>(null);

export function usePluginConfig() {
	const config = useContext(PluginConfigContext);

	if (config == null) {
		throw Error(
			"PluginConfig is not initialized. Make sure to wrap your widget in a PluginConfigProvider"
		);
	}

	return config;
}

export function PluginConfigProvider({
										 children,
										 props
									 }: {
	children: any;
	props: PluginProps;
}) {
	const [searchParams, setSearchParams] = useSearchParams();
	const { config, error, loading, refetch } = useGetPluginConfig(
		props.dashboardItemId
	);
	const navigate = useNavigate();
	const { id } = useParams<{ id: string }>();

	useEffect(() => {
		if (config) {
			if (!id) {
				if (!Array.isArray(config)) {
					navigate(`${config.scorecardId}`);
				}
			}
		}
	}, [config]);

	useEffect(() => {
		if (props.dashboardItemFilters) {
			if (config && !Array.isArray(config)) {
				setSearchParams((prev) => {
					const searchParams = new URLSearchParams(prev);
					if (!isEmpty(props.dashboardItemFilters.ou)) {
						searchParams.set("ou", props.dashboardItemFilters.ou.map(({ id }) => id).join(","));
					} else {
						searchParams.delete("ou");
					}
					if (!isEmpty(props.dashboardItemFilters.pe)) {
						searchParams.set("pe", props.dashboardItemFilters.pe.map(({ id }) => id).join(","));
					} else {
						searchParams.delete("pe");
					}
					return searchParams;
				});
			}
		} else {
			if (!isEmpty(searchParams.get("ou")) || !isEmpty(searchParams.get("pe"))) {
				setSearchParams(new URLSearchParams());
			}
		}
	}, [props.dashboardItemFilters]);

	if (loading) {
		return <FullPageLoader />;
	}

	if (error && error.details.httpStatusCode !== 404) {
		return <FullPageError resetErrorBoundary={refetch} error={error} />;
	}

	return (
		<PluginConfigContext.Provider
			value={{
				props,
				config
			}}
		>
			{children}
		</PluginConfigContext.Provider>
	);
}
