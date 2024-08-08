import {
	FullPageError,
	FullPageLoader,
	SystemSettingsState,
} from "@scorecard/shared";
import React, { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { HashRouter, Navigate, Route, Routes } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { steps } from "../Main/components/ScoreCardManagement/state/pages";

const Main = React.lazy(() => import("../Main"));
const ScorecardManagement = React.lazy(
	() => import("../Main/components/ScoreCardManagement"),
);
const ScorecardView = React.lazy(() =>
	import("@scorecard/shared").then((module) => ({
		default: module.ScorecardView,
	})),
);
const ScorecardMigration = React.lazy(
	() => import("../Main/components/ScorecardMigration"),
);

const pages = [
	{
		path: "/migrate",
		component: ScorecardMigration,
	},
	{
		path: "/edit/:id",
		component: ScorecardManagement,
		subItems: [
			...steps.map((step) => ({
				path: step.id,
				component: step.component,
			})),
		],
	},
	{
		path: "/add",
		component: ScorecardManagement,
		subItems: [
			...steps.map((step) => ({
				path: step.id,
				component: step.component,
			})),
		],
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
						{pages.map(
							({ path, component: Component, subItems }) => (
								<Route
									key={path}
									path={path}
									element={
										<ErrorBoundary
											FallbackComponent={FullPageError}
										>
											<Component />
										</ErrorBoundary>
									}
								>
									{subItems?.map(
										({ path, component: Component }) => {
											return (
												<Route
													element={
														<ErrorBoundary
															FallbackComponent={
																FullPageError
															}
														>
															<Component />
														</ErrorBoundary>
													}
													key={path}
													path={path}
												/>
											);
										},
									)}
								</Route>
							),
						)}
						<Route path="*" element={<Navigate to="/" />} />
					</Routes>
				</Suspense>
			</ErrorBoundary>
		</HashRouter>
	);
}
