import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { PluginConfig, PluginProps } from "../types";
import postRobot from "@krakenjs/post-robot";
import { FullPageLoader } from "@scorecard/shared";
import i18n from "@dhis2/d2-i18n";
import { usePluginConfigData } from "../hooks/data";
import { colors } from "@dhis2/ui";
import ErrorIcon from "@material-ui/icons/Error";

const PluginConfigContext = createContext<PluginConfig | null>(null);


export function usePluginConfig() {
	const config = useContext(PluginConfigContext);

	if (config == null) {
		throw Error("PluginConfig is not initialized. Make sure to wrap your widget in a PluginConfigProvider");
	}

	return config;
}


export function PluginConfigProvider({ children, props }: { children: any, props: PluginProps }) {
	const [parentConfig, setParentConfig] = useState<any>();
	const dashboardItemId = useMemo(() => {
		return new URL(window.location.href).searchParams.get("dashboardItemId");
	}, []);
	const { itemConfig, loading } = usePluginConfigData(dashboardItemId);

	console.log({ parentConfig, props });
	useEffect(() => {
		postRobot.send(window.parent, "getProps").then((event) => setParentConfig(event.data));
		const listener = postRobot.on("newProps", { window: window.parent }, async (newProps) => {
			console.log("newProps", newProps);
			setParentConfig(newProps.data);
		});

		return () => listener.cancel();
	}, []);

	if (!dashboardItemId) {
		const error = Error("Could not get dashboardItemId from url");
		return (
			<div
				style={{ height: "100%", width: "100%", textAlign: "center", flexDirection: "column", display: "flex" }}
			>
				<>
					<div style={{ height: "100%", width: "100%", textAlign: "center", flexDirection: "column", display: "flex" }}>
						<ErrorIcon
							style={{ color: colors.grey700, fontSize: 64 }}
							fontSize="large"
						/>
						<h2 style={{ color: colors.grey700, margin: 8 }}>
							{i18n.t("Something Went Wrong")}
						</h2>
						<p style={{ color: colors.grey700 }}>
							{error?.message}
						</p>
					</div>
				</>
			</div>
		);
	}

	if (loading) {
		return (
			<FullPageLoader />
		);
	}

	return (
		<PluginConfigContext.Provider value={{
			props,
			dashboardItemId,
			...(itemConfig ?? {})
		}}>
			{children}
		</PluginConfigContext.Provider>
	);
}

