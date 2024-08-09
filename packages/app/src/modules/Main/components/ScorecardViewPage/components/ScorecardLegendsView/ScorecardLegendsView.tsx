import { ArrowLegendsView } from "./components/ArrowLegendView";
import { ScorecardConfig } from "@hisptz/dhis2-analytics";
import { LegendView } from "./components/LegendView";
import { SpecificTargetLegendsView } from "./components/SpecificTargetLegendsView";

export function ScorecardLegendsView({ config }: { config: ScorecardConfig }) {
	const legendDefinitions = config.legendDefinitions;

	return (
		<div
			style={{ gap: 16, padding: "0 16px" }}
			className="row align-items-center space-between"
		>
			<div
				style={{
					display: "grid",
					gap: 8,
					gridTemplateColumns: `repeat(${legendDefinitions.length}, auto)`,
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
					<SpecificTargetLegendsView config={config} />
				</div>
			</div>
		</div>
	);
}
