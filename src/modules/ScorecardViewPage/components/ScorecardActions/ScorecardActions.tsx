import { ButtonStrip } from "@dhis2/ui";
import { ScorecardOptionsControlButton } from "./components/ScorecardOptionsControlButton";
import { ScorecardEditButton } from "./components/ScorecardEditButton";
import { ScorecardPrint } from "@hisptz/dhis2-scorecard";
import { ScorecardResetButton } from "./components/ScorecardResetButton";
import { ScorecardSharing } from "../../../ScorecardManagement/components/General/components/ScorecardSharing";

export function ScorecardActions() {
	return (
		<div style={{ width: "100%", padding: "0 16px" }}>
			<ButtonStrip end>
				<ScorecardOptionsControlButton />
				<ScorecardEditButton />
				<div id="download-button">
					<ScorecardPrint />
				</div>
				<ScorecardSharing />
				<ScorecardResetButton />
			</ButtonStrip>
		</div>
	);
}
