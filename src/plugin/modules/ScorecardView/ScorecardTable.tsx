import { useRef } from "react";
import { useResizeObserver } from "usehooks-ts";
import { Scorecard } from "@hisptz/dhis2-scorecard";

export function ScorecardTable() {
	const ref = useRef<HTMLDivElement | null>(null);
	const { height, width } = useResizeObserver({
		ref
	});
	return (
		<div ref={ref} className="flex-1 w-full p-4">
			<Scorecard
				tableProps={{
					width: "100%",
					scrollWidth: `${width}px`,
					scrollHeight: `${height ?? 100}px`
				}}
			/>
		</div>
	);
}
