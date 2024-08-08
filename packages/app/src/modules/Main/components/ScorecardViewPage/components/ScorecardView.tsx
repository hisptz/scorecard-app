import { useScorecardState } from "../state/state";
import { ScorecardConfig } from "@hisptz/dhis2-analytics";
import { useDimensions } from "../hooks/dimensions";
import i18n from "@dhis2/d2-i18n";
import { colors } from "@dhis2/ui";

export interface ScorecardViewProps {
	config: ScorecardConfig;
}

export function ScorecardView({ config }: ScorecardViewProps) {
	const { noDimensionsSelected } = useDimensions();
	const [state, setState] = useScorecardState();

	if (noDimensionsSelected) {
		return (
			<div className="h-100 w-100 column align-items-center justify-content-center">
				<span
					style={{
						color: colors.grey700,
						fontWeight: "bold",
						fontSize: 24,
					}}
				>
					{i18n.t(
						"Select organisation unit and period to view scorecard",
					)}
				</span>
			</div>
		);
	}

	return (
		<div className="h-100 w-100 column align-items-center justify-content-center">
			{/*<Scorecard config={config} state={state} setState={setState} />*/}
		</div>
	);
}
