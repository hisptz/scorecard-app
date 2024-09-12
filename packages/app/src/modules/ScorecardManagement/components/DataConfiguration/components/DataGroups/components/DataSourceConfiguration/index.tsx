import { ContainerLoader } from "@scorecard/shared";
import React, { Suspense } from "react";
import { DataSourceInstructions } from "../../../Instructions";
import SelectedDataSourceConfigurationForm from "./components/Form";
import { useSelectedData } from "../../../../states/selectionState";

export default function DataSourceConfiguration() {
	const selectedData = useSelectedData();

	return (
		<div>
			<Suspense fallback={<ContainerLoader />}>
				{selectedData ? (
					<SelectedDataSourceConfigurationForm />
				) : (
					<div className="row center align-items-center">
						<DataSourceInstructions />
					</div>
				)}
			</Suspense>
		</div>
	);
}
