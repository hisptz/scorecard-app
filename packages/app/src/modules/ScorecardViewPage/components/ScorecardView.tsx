import { useRef } from "react";
import { useWindowSize } from "usehooks-ts";
import { Scorecard } from "@hisptz/dhis2-scorecard";

export function ScorecardView({ headerHeight }: { headerHeight?: number }) {
	const ref = useRef<HTMLDivElement | null>(null);
	const { width = 0, height = 0 } = useWindowSize();

	return (
		<div
			ref={ref}
			style={{ padding: 16, width: "100%", height: "100%", position: "relative" }}
			className="w-100 column scorecard-table"

		>
			<Scorecard
				tableProps={{
					scrollWidth: `${width - 32}px`,
					scrollHeight: `${height - ((headerHeight ?? 300) + 96 + (16 * 3))}px`
				}}
			/>
		</div>
	);
}
