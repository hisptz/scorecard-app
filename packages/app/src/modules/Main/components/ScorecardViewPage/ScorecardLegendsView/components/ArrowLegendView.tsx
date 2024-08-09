import { IconArrowDown24, IconArrowUp24 } from "@dhis2/ui";
import i18n from "@dhis2/d2-i18n";
import { useScorecardState } from "../../state/state";

export function ArrowLegendsView(props: any) {
	const [state] = useScorecardState();
	const showArrows = state.options.arrows;

	if (!showArrows) {
		return null;
	}

	return (
		<div
			style={{ gap: 16, display: "grid", gridTemplateColumns: "1fr 1fr" }}
		>
			<div style={{ gap: 8 }} className="row align-items-center">
				<IconArrowUp24 />
				{i18n.t("Increased from last period")}
			</div>
			<div style={{ gap: 8 }} className="row align-items-center">
				<IconArrowDown24 />
				{i18n.t("Decreased from last period")}
			</div>
		</div>
	);
}
