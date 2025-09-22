import i18n from "@dhis2/d2-i18n";
import { useConfig } from "@dhis2/app-runtime";
import { Button, IconLaunch24, IconSearch24 } from "@dhis2/ui";
import { useSearchParams } from "react-router-dom";
import { IconResize } from "@/shared/components/IconResize";

export function EmptyScorecardList() {
	const config = useConfig();
	const [searchParams] = useSearchParams();
	const query = searchParams.get("query");
	const appURL = `${config.baseUrl}/api/apps/hisptz-scorecard/index.html`;


	if (query) {
		return (
			<div
				className="flex flex-col w-full h-full items-center justify-center p-4 gap-2 text-center min-h-[300px]"

			>
				<IconResize size={40}>
					<IconSearch24 />
				</IconResize>
				<h5 className="font-bold">
					{i18n.t("No scorecards found")}
				</h5>
				<span className="text-gray-500 text-sm">
					{i18n.t("Could not find any scorecards matching the keyword '{{keyword}}'", { keyword: query })}.
				</span>
			</div>
		);
	}


	return (
		<div
			className="flex flex-col w-full items-center justify-center p-4 gap-4 text-center "
		>
			<div className="text-center gap-2 flex flex-col">
				<h2 className="font-bold text-2xl">
					{i18n.t("Welcome to the Scorecard Dashboard Plugin")}
				</h2>
				<span>
					{i18n.t(
						"You do not have any scorecards configured. Create a scorecard first in the Scorecard app first."
					)}
				</span>
			</div>
			<Button
				icon={<IconLaunch24 />}
				primary
				onClick={() => {
					window.open(appURL, "_blank", "noopener,noreferrer");
				}}
			>
				{i18n.t("Go to scorecard app")}
			</Button>
		</div>
	);
}
