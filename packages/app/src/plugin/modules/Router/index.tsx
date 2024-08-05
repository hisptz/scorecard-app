import {
	FullPageError,
	FullPageLoader,
	ScorecardView,
	SystemSettingsState,
} from "@scorecard/shared";
import React, { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { HashRouter, Navigate, Route, Routes } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import Main from "../Main/index";
import { scorecardWidgetState } from "../../states/scorecard";

const pages = [
	{
		path: "/view/:id",
		component: ScorecardView,
	},
	{
		path: "/",
		component: Main,
	},
];

export default function Router(props: any) {
	useRecoilValue(SystemSettingsState);
	const { dashboardId } = props;
	const setCurrentDashboardId = useSetRecoilState(scorecardWidgetState);
	setCurrentDashboardId(dashboardId);

	return (
		<HashRouter>
			<ErrorBoundary FallbackComponent={FullPageError}>
				<Suspense fallback={<FullPageLoader />}>
					<Routes>
						{pages.map(({ path, component }) => {
							const Component = component;

							return (
								<Route
									key={path}
									path={path}
									element={
										<ErrorBoundary FallbackComponent={FullPageError}>
											<Component widget={true} />
										</ErrorBoundary>
									}
								></Route>
							);
						})}
						<Route path="*" element={<Navigate to="/" />} />
					</Routes>
				</Suspense>
			</ErrorBoundary>
		</HashRouter>
	);
}
