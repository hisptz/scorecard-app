import { CircularLoader } from "@dhis2/ui";
import React, { Suspense, useMemo } from "react";
import { useFormContext } from "react-hook-form";
import DataSourceConfigurationForm from "../../../../../DataSourceConfigurationForm";
import { useSelectedData } from "../../../../../../states/selectionState";
import { ScorecardDataSource } from "@hisptz/dhis2-scorecard";

export default function SelectedDataSourceConfigurationForm() {
	const { getValues } = useFormContext();
	const selectedData = useSelectedData();

	const path = useMemo(() => `dataSelection.dataGroups.${selectedData?.groupIndex}.dataHolders.${selectedData?.holderIndex}`, [selectedData?.groupIndex, selectedData?.holderIndex]);

	const selectedDataHolder = useMemo(() => {
		return getValues(path);
	}, [path]);

	return (
		<div className="data-configuration-row flex gap-16">
			{selectedDataHolder?.dataSources?.map(
				(dataSource: ScorecardDataSource, index: number) => {
					const dataSourcePath = `${path}.dataSources.${index}`;
					return (
						<div
							key={dataSource.id}
							style={{ maxWidth: 720, minWidth: 480 }}
							className="w-100 h-100"
						>
							<div style={{ background: "white" }} className="container-bordered h-100">
								<div className="column">
									<div className="p-16">
										<Suspense
											fallback={
												<div className="w-100 h-100 center align-items-center">
													<CircularLoader small />
												</div>
											}
										>
											<DataSourceConfigurationForm
												path={dataSourcePath}
											/>
										</Suspense>
									</div>
								</div>
							</div>
						</div>
					);
				}
			) || null}
		</div>
	);
}
