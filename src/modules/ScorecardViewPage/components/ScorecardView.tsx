import { useRef } from "react";
import { useResizeObserver } from "usehooks-ts";
import { Scorecard } from "@hisptz/dhis2-scorecard";

export function ScorecardView({ height }: { height: number }) {
	const ref = useRef<HTMLDivElement | null>(null);
	const { width } = useResizeObserver({
		ref
	});

	return (
		<div
			ref={ref}
			style={{ padding: 16, width: "100%", height: "100%", maxHeight: "100%" }}
		>
			<Scorecard
				tableProps={{
					scrollWidth: `${width}px`,
					scrollHeight: `${height}px`
				}}
			/>
		</div>
	);
}


