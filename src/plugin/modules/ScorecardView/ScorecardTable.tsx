import { Scorecard } from "@hisptz/dhis2-scorecard";
import { useRef } from "react";

export function ScorecardTable({
	containerWidth,
	containerHeight,
	headerHeight,
}: {
	containerWidth: number;
	containerHeight: number;
	headerHeight: number;
}) {
	const ref = useRef<HTMLDivElement | null>(null);
	return (
		<div
			ref={ref}
			style={{
				padding: 16,
				position: "relative",
				width: "100%",
				height: "100%",
			}}
		>
			<Scorecard
				tableProps={{
					width: "100%",
					scrollWidth: `${containerWidth - 32}px`,
					scrollHeight: `${
						containerHeight - ((headerHeight ?? 300) + 96 + 16 * 3)
					}px`,
				}}
			/>
		</div>
	);
}
