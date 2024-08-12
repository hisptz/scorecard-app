import { ArrowLegendsView } from "./components/ArrowLegendView";
import { SpecificTargetLegendsView } from "./components/SpecificTargetLegendsView";
import { useScorecardConfig } from "@hisptz/dhis2-analytics";
import { LegendView } from "./components/LegendView";

export function ScorecardLegendsView() {
	const config = useScorecardConfig();
	const legendDefinitions = config!.legendDefinitions;

	return (
		<div
			style={{ gap: 16, padding: "0 16px" }}
			className="row align-items-center space-between"
		>
			<div
				style={{
					display: "grid",
					gap: 8,
					gridTemplateColumns: `repeat(${legendDefinitions.length}, auto)`
				}}
			>
				{legendDefinitions.map((item) => (
					<LegendView legend={item} key={item.id} />
				))}
			</div>
			<div>
				<div
					style={{ gap: 16, justifySelf: "flex-end" }}
					className="row align-items-center space-between"
				>
					<ArrowLegendsView />
					<SpecificTargetLegendsView  />
				</div>
			</div>
		</div>
	);
}


