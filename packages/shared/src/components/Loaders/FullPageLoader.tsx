import { CircularLoader } from "@dhis2/ui";
import React from "react";

export default function FullPageLoader({
	text,
	small,
}: {
	text?: string;
	small?: boolean;
}) {
	return (
		<div
			className="column center"
			style={{
				height: "100%",
				width: "100%",
				alignItems: "center",
				justifyContent: "center",
				display: "flex",
				flexDirection: "column",
			}}
		>
			<CircularLoader small={small} />
			<p>{text}</p>
		</div>
	);
}
