import { FullPageError, FullPageLoader } from "@scorecard/shared";
import { SystemSettingsState } from "@scorecard/shared";
import React, { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import { useRecoilValue } from "recoil";

const Main = React.lazy(() => import("../Main"));
const ScorecardManagement = React.lazy(() =>
	import("../Main/Components/ScoreCardManagement"),
);
const ScorecardView = React.lazy(() =>
	import("@scorecard/shared").then((module) => ({
		default: module.ScorecardView,
	})),
);
const ScorecardMigration = React.lazy(() =>
	import("../Main/Components/ScorecardMigration"),
);

const pages = [
	{
		path: "/migrate",
		component: ScorecardMigration,
	},
	{
		path: "/edit/:step/:id",
		component: ScorecardManagement,
	},
	{
		path: "/add/:step?",
		component: ScorecardManagement,
	},
	{
		path: "/view/:id",
		component: ScorecardView,
	},
	{
		path: "/",
		component: Main,
	},
];

export default function Router() {
	useRecoilValue(SystemSettingsState);

	return (
		<HashRouter>
			<ErrorBoundary FallbackComponent={FullPageError}>
				<Suspense fallback={<FullPageLoader />}>
					<Routes>
						{pages.map(({ path, component: Component }) => (
							<Route
								key={path}
								path={path}
								element={
									<ErrorBoundary FallbackComponent={FullPageError}>
										<Component />
									</ErrorBoundary>
								}
							/>
						))}
						<Route path="*" element={<Navigate to="/" />} />
					</Routes>
				</Suspense>
			</ErrorBoundary>
		</HashRouter>
	);
}
