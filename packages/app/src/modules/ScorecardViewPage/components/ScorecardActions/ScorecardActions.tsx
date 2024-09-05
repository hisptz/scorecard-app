import { ButtonStrip } from "@dhis2/ui";
import { ScorecardOptionsControlButton } from "./components/ScorecardOptionsControlButton";
import { ScorecardEditButton } from "./components/ScorecardEditButton";
import { ScorecardDownloadButton } from "./components/ScorecardDownloadButton";
import { ScorecardResetButton } from "./components/ScorecardResetButton";

export function ScorecardActions() {
	return (
		<div style={{ width: "100%", padding: "0 16px" }}>
			<ButtonStrip end>
				<ScorecardOptionsControlButton />
				<ScorecardEditButton />
				<ScorecardDownloadButton />
				<ScorecardResetButton />
			</ButtonStrip>
		</div>
	);
}
