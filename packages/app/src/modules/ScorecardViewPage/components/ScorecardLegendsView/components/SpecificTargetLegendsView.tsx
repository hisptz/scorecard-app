import { OrgUnitLevelLegend, ScorecardDataSource, useGetDataSourceLabel, useScorecardConfig } from "@hisptz/dhis2-analytics";
import { getDataSourcesFromGroups } from "@scorecard/shared";
import { filter, groupBy, head, isEmpty } from "lodash";
import { Button, Modal, ModalActions, ModalContent, ModalTitle } from "@dhis2/ui";
import i18n from "@dhis2/d2-i18n";
import { useMemo } from "react";
import { OrgUnitSpecificTargetView } from "./OrgUnitSpecificTargetView";
import { PeriodSpecificTargetView } from "./PeriodSpecificTargetView";
import { useBoolean } from "usehooks-ts";
import { OrgUnitLevelSpecificTargetView } from "./OrgUnitLevelSpecificTargetView";


export function SpecificTargetsLibrary() {
	const config = useScorecardConfig();
	const dataSources = getDataSourcesFromGroups(config.dataSelection.dataGroups);
	const specificTargetsDataSourcesByType = useMemo(() => {
		const dataSourcesWithSpecificTargets = dataSources.filter((ds) => ds.specificTargetsSet);
		const data = groupBy(
			filter(
				dataSourcesWithSpecificTargets,
				(ds) => !isEmpty(ds.specificTargets)
			),
			(ds) => head(ds.specificTargets)?.type
		);
		data["orgUnitLevel"] = dataSourcesWithSpecificTargets.filter((ds) =>
			isEmpty(ds.specificTargets)
		);
		return data as { period: Array<ScorecardDataSource> | undefined; orgUnit: Array<ScorecardDataSource> | undefined; orgUnitLevel: Array<ScorecardDataSource> };
	}, [dataSources]);


	const getDataSourceLabel = useGetDataSourceLabel();
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
												dataSource.specificTargets
											)!}
											label={getDataSourceLabel(dataSource)}
										/>
										<div className="page-break" />
									</>
								)
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
												dataSource.specificTargets
											)!}
											label={getDataSourceLabel(dataSource)}
										/>
										<div className="page-break" />
									</>
								)
							)}
						</div>
						<div className="page-break" />
					</div>
				)}
				{!isEmpty(specificTargetsDataSourcesByType.orgUnitLevel) && (
					<div>
						<h3>{i18n.t("Organisation unit level targets")}</h3>
						<div className="column gap-16">
							{specificTargetsDataSourcesByType?.orgUnitLevel.map(
								(dataSource) => (
									<OrgUnitLevelSpecificTargetView
										key={`${dataSource.id}-orgUnit-specific-target`}
										specificTarget={dataSource.legends as OrgUnitLevelLegend}
										label={getDataSourceLabel(dataSource)}
									/>
								)
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
										onClose
									}: {
	hide: boolean;
	onClose: () => void;
}) {
	return (
		<Modal large position="middle" hide={hide} onClose={onClose}>
			<ModalTitle>{i18n.t("Specific targets")}</ModalTitle>
			<ModalContent>
				<SpecificTargetsLibrary />
			</ModalContent>
			<ModalActions>
				<Button onClick={onClose}>{i18n.t("Close")}</Button>
			</ModalActions>
		</Modal>
	);
}

export function SpecificTargetLegendsView() {
	const config = useScorecardConfig();
	const { value: hide, setTrue: onClose, setFalse: onShow } = useBoolean(true);
	const dataSources = getDataSourcesFromGroups(
		config.dataSelection.dataGroups
	);
	const dataSourcesWithSpecificTargets = dataSources.filter(
		(dataSource) =>
			!isEmpty(dataSource.specificTargets) || !Array.isArray(dataSource.legends)
	);

	console.log(dataSourcesWithSpecificTargets);

	if (isEmpty(dataSourcesWithSpecificTargets)) {
		return null;
	}

	return <>
		{
			!hide && (<SpecificTargetLegendsModal hide={hide} onClose={onClose} />)
		}
		<Button onClick={onShow}>{i18n.t("Specific Targets Library")}</Button>
	</>;
}
