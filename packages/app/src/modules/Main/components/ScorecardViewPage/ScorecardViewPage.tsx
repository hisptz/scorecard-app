import { DimensionFilterArea } from "./components/DimensionFilterArea";

export function ScorecardViewPage() {
	return (
		<div
			style={{
				width: "100%",
				height: "100%",
				display: "flex",
				flexDirection: "column",
				gap: 16,
			}}
		>
			<DimensionFilterArea />
		</div>
	);
}
