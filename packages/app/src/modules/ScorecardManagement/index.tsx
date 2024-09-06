import { AccessDeniedPage, FullPageLoader } from "@scorecard/shared";
import React, { Suspense } from "react";
import { FormProvider } from "react-hook-form";
import useScorecardFormMetadata from "./hooks/meta";
import { ManagementTabBar } from "./components/ManagementTabBar";
import { Outlet } from "react-router-dom";
import { TabHeader } from "./components/TabHeader";
import { NavigationButtons, StepNavigationButtons } from "./components/NavigationButtons";
import { DevTool } from "@hookform/devtools";

export default function ScoreCardManagement() {
	const { form, access } = useScorecardFormMetadata();
	if (form.formState.isLoading || access == null) {
		return <FullPageLoader />;
	}
	if (!access.write) {
		return <AccessDeniedPage accessType={"edit"} />;
	}

	return (
		<FormProvider {...form}>
			<Suspense fallback={<FullPageLoader />}>
				<div style={{ display: "flex", flexDirection: "column", height: "100%" }} className="w-100">
					<ManagementTabBar />
					<div className="column flex-1 overflow-auto">
						<div style={{ flexGrow: 1, padding: "0 24px", display: "flex", flexDirection: "column", gap: 16 }}>
							<TabHeader />
							<div className="flex-1">
								<Suspense fallback={<FullPageLoader />}>
									<Outlet />
								</Suspense>
							</div>
							<StepNavigationButtons />
						</div>
						<div style={{ padding: 24 }} className="w-100 row center">
							<NavigationButtons />
						</div>
					</div>
				</div>
			</Suspense>
			<DevTool control={form.control} />
		</FormProvider>
	);
}
