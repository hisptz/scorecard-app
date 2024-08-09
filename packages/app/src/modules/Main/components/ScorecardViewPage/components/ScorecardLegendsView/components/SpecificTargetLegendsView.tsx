import { ScorecardConfig, ScorecardLegend } from "@hisptz/dhis2-analytics";
import { getDataSourcesFromGroups } from "@scorecard/shared";
import { find, isEmpty } from "lodash";
import {
	Button,
	Modal,
	ModalActions,
	ModalContent,
	ModalTitle,
} from "@dhis2/ui";
import i18n from "@dhis2/d2-i18n";
import {
	OrgUnitSpecificTargetView,
	PeriodSpecificTargetView,
} from "../../../../ScoreCardManagement/Components/DataConfiguration/Components/DataGroups/Components/DataSourceConfiguration/Components/TargetsArea/components/SpecificTargetView";

function LegendsView({
	legends,
	config,
}: {
	legends: ScorecardLegend[];
	config: ScorecardConfig;
}) {
	const legendDefinitions = config.legendDefinitions;

	return (
		<div className="column gap-8">
			<table>
				<col width="60%" />
				<col width="20%" />
				<col width="20%" />
				<thead>
					<tr>
						<th align="left">{i18n.t("Legend")}</th>
						<th>{i18n.t("Min")}</th>
						<th>{i18n.t("Max")}</th>
					</tr>
				</thead>
				<tbody>
					{legends?.map((legend) => {
						const legendDefinition = find(legendDefinitions, {
							id: legend.legendDefinitionId,
						});
						if (!legendDefinition) {
							return <tr></tr>;
						}
						return (
							<tr key={`${legend.id}-view`}>
								<td>
									<table>
										<col width="20%" />
										<col width="80%" />
										<tbody>
											<tr>
												<td>
													<div
														style={{
															height: 24,
															width: 32,
															background:
																legendDefinition.color,
														}}
													/>
												</td>
												<td>{legendDefinition.name}</td>
											</tr>
										</tbody>
									</table>
								</td>
								<td align="center">{legend?.startValue}</td>
								<td align="center">{legend?.endValue}</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
}

export function SpecificTargetsLibrary({
	config,
}: {
	config: ScorecardConfig;
}) {
	const specificTargetsDataSourcesByType = useMemo(() => {
		const dataSourcesWithSpecificTargets = filter(
			dataSources,
			(ds) => ds.specificTargetsSet,
		);
		const data = groupBy(
			filter(
				dataSourcesWithSpecificTargets,
				(ds) => !isEmpty(ds.specificTargets),
			),
			(ds) => head(ds.specificTargets)?.type,
		);
		data["orgUnitLevel"] = dataSourcesWithSpecificTargets.filter((ds) =>
			isEmpty(ds.specificTargets),
		);
		return data;
	}, [dataSources]);
	return (
		<>
			<div className="column gap-16">
				{!isEmpty(specificTargetsDataSourcesByType?.orgUnit) && (
					<div>
						<h3>{i18n.t("Organisation Units Specific targets")}</h3>
						<div className="row gap-16">
							{specificTargetsDataSourcesByType?.orgUnit?.map(
								(dataSource) => (
									<>
										<OrgUnitSpecificTargetView
											key={`${dataSource.id}-orgUnit-specific-target`}
											specificTarget={head(
												dataSource.specificTargets,
											)}
											dataSourceLabel={dataSource.label}
										/>
										<div className="page-break" />
									</>
								),
							)}
						</div>
						<div className="page-break" />
					</div>
				)}
				{!isEmpty(specificTargetsDataSourcesByType?.period) && (
					<div>
						<h3>{i18n.t("Period Specific targets")}</h3>
						<div className="row gap-16">
							{specificTargetsDataSourcesByType?.period?.map(
								(dataSource) => (
									<>
										<PeriodSpecificTargetView
											key={`${dataSource.id}-orgUnit-specific-target`}
											specificTarget={head(
												dataSource.specificTargets,
											)}
											dataSourceLabel={dataSource.label}
										/>
										<div className="page-break" />
									</>
								),
							)}
						</div>
						<div className="page-break" />
					</div>
				)}
				{!isEmpty(specificTargetsDataSourcesByType?.orgUnitLevell) && (
					<div>
						<h3>{i18n.t("Organisation unit level targets")}</h3>
						<div className="column gap-16">
							{specificTargetsDataSourcesByType?.orgUnitLevel?.map(
								(dataSource) => (
									<OrgUnitLevelSpecificTargetView
										key={`${dataSource.id}-orgUnit-specific-target`}
										legends={dataSource.legends}
										dataSourceLabel={dataSource.label}
									/>
								),
							)}
						</div>
						<div className="page-break" />
					</div>
				)}
			</div>
		</>
	);
}

function SpecificTargetLegendsModal({
	hide,
	onClose,
}: {
	hide: boolean;
	onClose: () => void;
}) {
	return (
		<Modal>
			<ModalTitle>{i18n.t("Specific targets")}</ModalTitle>
			<ModalContent></ModalContent>
			<ModalActions>
				<Button onClick={onClose}>{i18n.t("Close")}</Button>
			</ModalActions>
		</Modal>
	);
}

export function SpecificTargetLegendsView({
	config,
}: {
	config: ScorecardConfig;
}) {
	const dataSources = getDataSourcesFromGroups(
		config.dataSelection.dataGroups,
	);
	const dataSourcesWithSpecificTargets = dataSources.filter(
		(dataSource) =>
			!!dataSource.specificTargets || !Array.isArray(dataSource.legends),
	);

	if (isEmpty(dataSourcesWithSpecificTargets)) {
		return null;
	}

	return <Button>{i18n.t("Specific Targets Library")}</Button>;
}
