import { ContainerLoader } from "@scorecard/shared";
import React, { Suspense } from "react";
import DataGroupArea from "./DataGroupArea";
import { PreviewArea } from "./components/DataGroups/components/DataGroup/components/PreviewArea";
import { InstructionArea } from "./components/DataGroups/components/DataGroup/components/InstructionArea";

export default function DataConfigurationScorecardForm() {

	return (
		<div className="row h-100">
			<div className="col-md-4 col-sm-6 p-16 groups-configuration-area">
				<div
					className=" container-bordered column"
					style={{ minHeight: "100%", height: "100%" }}
				>
					<Suspense fallback={<ContainerLoader />}>
						<DataGroupArea />
					</Suspense>
				</div>
			</div>
			<div className="col-md-8 p-16 h-100">
				<PreviewArea />
				<InstructionArea />
			</div>
		</div>
	);
}
