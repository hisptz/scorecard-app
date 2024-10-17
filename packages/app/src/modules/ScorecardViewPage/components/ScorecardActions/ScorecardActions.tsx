import { ButtonStrip } from "@dhis2/ui";
import { ScorecardOptionsControlButton } from "./components/ScorecardOptionsControlButton";
import { ScorecardEditButton } from "./components/ScorecardEditButton";
import { ScorecardResetButton } from "./components/ScorecardResetButton";
import { ScorecardPrint } from "@hisptz/dhis2-scorecard";

export function ScorecardActions() {
	return (
		<div style={{ width: "100%", padding: "0 16px" }}>
			<ButtonStrip end>
				<ScorecardOptionsControlButton />
				<ScorecardEditButton />
				<ScorecardPrint />
				<ScorecardResetButton />
			</ButtonStrip>
		</div>
	);
}
