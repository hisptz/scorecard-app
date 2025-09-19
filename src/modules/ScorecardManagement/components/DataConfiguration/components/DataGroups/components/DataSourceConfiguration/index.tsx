import React, { Suspense } from "react";
import { DataSourceInstructions } from "../../../Instructions";
import SelectedDataSourceConfigurationForm from "./components/Form";
import { useSelectedData } from "../../../../states/selectionState";
import { ContainerLoader } from "../../../../../../../../shared";

export default function DataSourceConfiguration() {
	const selectedData = useSelectedData();

	return (
		<div>
			<Suspense fallback={<ContainerLoader />}>
				{selectedData ? (
					<SelectedDataSourceConfigurationForm />
				) : (
					<div className="flex gap-4 center align-items-center">
						<DataSourceInstructions />
					</div>
				)}
			</Suspense>
		</div>
	);
}
