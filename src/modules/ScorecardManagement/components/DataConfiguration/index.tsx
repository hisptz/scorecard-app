import React, { Suspense } from "react";
import DataGroupArea from "./DataGroupArea";
import { PreviewArea } from "./components/DataGroups/components/DataGroup/components/PreviewArea";
import { InstructionArea } from "./components/DataGroups/components/DataGroup/components/InstructionArea";
import { SelectedDataStateProvider } from "./states/selectionState";
import { colors, Field } from "@dhis2/ui";
import { useController } from "react-hook-form";
import { ScorecardConfig } from "@hisptz/dhis2-scorecard";
import { ContainerLoader } from "../../../../shared";

export default function DataConfigurationScorecardForm() {

	const { fieldState } = useController<ScorecardConfig, "dataSelection.dataGroups">({
		name: "dataSelection.dataGroups"
	});

	return (
		<SelectedDataStateProvider>
			<div className="row h-100">
				<div className="col-md-4 col-sm-6 p-16 groups-configuration-area">
					<Field className="h-100" validationText={fieldState?.error?.message} error={!!fieldState.error}>
						<div
							className=" container-bordered column"
							style={fieldState.error ? { height: "100%", borderColor: colors.red500 } : { height: "100%", borderColor: "#A0ADBA" }}
						>
							<Suspense fallback={<ContainerLoader />}>
								<DataGroupArea />
							</Suspense>
						</div>
					</Field>
				</div>
				<div className="col-md-8 p-16 h-100">
					<Suspense fallback={<ContainerLoader />}>
						<PreviewArea />
						<InstructionArea />
					</Suspense>
				</div>
			</div>
		</SelectedDataStateProvider>
	);
}
