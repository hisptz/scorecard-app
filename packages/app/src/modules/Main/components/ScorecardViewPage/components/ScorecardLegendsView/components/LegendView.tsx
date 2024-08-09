import { LegendDefinition } from "@hisptz/dhis2-analytics";

export interface LegendViewProps {
	legend: LegendDefinition;
}

export function LegendView({ legend }: LegendViewProps) {
	const { color, name, id } = legend;
	return (
		<div key={id} className="row align-items-center">
			<div
				style={{
					width: 60,
					height: 25,
					background: color,
					border: "1px solid rgb(232, 237, 242)",
					padding: 16,
				}}
			/>
			<p style={{ paddingLeft: 8, marginRight: 8 }}>{name}</p>
		</div>
	);
}
