import i18n from "@dhis2/d2-i18n";
import {
	Button,
	ButtonStrip,
	CircularLoader,
	DropdownButton,
	IconAdd24,
	IconApps24,
	IconList24,
	IconQuestion24,
	Tooltip
} from "@dhis2/ui";
import { FullPageError, HelpState, SCORECARD_LIST_HELP_STEPS, STEP_OPTIONS } from "../../shared";
import { Steps } from "intro.js-react";
import HelpMenu from "./components/HelpMenu";
import { SearchArea } from "./components/SearchArea";
import { useSetting } from "@dhis2/app-service-datastore";
import { useAlert } from "@dhis2/app-runtime";
import { Navigate, useNavigate } from "react-router-dom";
import { ScorecardListArea } from "./components/ScorecardListArea";
import { ErrorBoundary } from "react-error-boundary";
import { MigrationNavigateButton } from "../ScorecardMigration/components/MigrationNavigateButton";
import { useRecoilState } from "recoil";
import { useSharingCleanupCheck } from "@/shared/components/SharingCleanup/hooks/service";

export default function ScorecardList() {

	const [scorecardViewType, { set }] = useSetting("scorecardViewType");
	const [helpEnabled, setHelpEnabled] = useRecoilState<boolean>(HelpState);
	const { show } = useAlert(
		({ message }) => message,
		({ type }) => ({ ...type, duration: 3000 })
	);
	const onViewChange = () => {
		try {
			if (scorecardViewType === "grid") {
				set("list");
				return;
			}
			set("grid");
		} catch (e) {
			if (e instanceof Error) {
				show({
					message: e.message ?? e.toString(),
					type: { critical: true }
				});
			}
		}
	};
	const navigate = useNavigate();

	const onAddClick = () => {
		navigate("/add/general");
	};

	const onHelpExit = () => {
		setHelpEnabled(false);
	};
	const { shouldCheck, loading } = useSharingCleanupCheck();

	if (loading) {
		return (
			<div className="h-full flex flex-col gap-4 align-items-center center">
				<CircularLoader />
			</div>
		);
	}

	if (shouldCheck) {
		return <Navigate to="/cleanup" />;
	}

	return (
		<>
			<Steps
				options={STEP_OPTIONS}
				enabled={helpEnabled}
				steps={SCORECARD_LIST_HELP_STEPS}
				onExit={onHelpExit}
				initialStep={0}
			/>
			<div className="column h-full p-16">
				<div className="flex flex-row w-full gap-16 ">
					<div className="flex items-center center flex-1">
						<div className="min-w-[400px] max-w-full">
							<SearchArea />
						</div>
					</div>
					<ButtonStrip end>
						<DropdownButton
							type="button"
							component={<HelpMenu />}
							icon={<IconQuestion24 />}
						>
							{i18n.t("Help")}
						</DropdownButton>
						<Tooltip
							content={i18n.t("Switch to {{viewType}} view", {
								viewType:
									scorecardViewType === "grid"
										? i18n.t("list")
										: i18n.t("grid")
							})}
						>
							<Button
								onClick={onViewChange}
								className="change-view-button"
								dataTest="scorecard-view-orientation"
								icon={
									scorecardViewType === "grid" ? (
										<IconList24 />
									) : (
										<IconApps24 />
									)
								}
							/>
						</Tooltip>
						<Button
							dataTest="new-scorecard-button"
							className="add-scorecard-button"
							onClick={onAddClick}
							primary
							icon={<IconAdd24 />}
						>
							{i18n.t("Add New Scorecard")}
						</Button>
					</ButtonStrip>
				</div>
				<div className="flex-1">
					<ErrorBoundary FallbackComponent={FullPageError}>
						<ScorecardListArea />
					</ErrorBoundary>
				</div>
				<div className="row end">
					<MigrationNavigateButton />
				</div>
			</div>
		</>
	);
}
