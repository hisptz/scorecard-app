import i18n from "@dhis2/d2-i18n";
import { Button, colors, Tag } from "@dhis2/ui";
import { createFixedPeriodFromPeriodId } from "@dhis2/multi-calendar-dates";
import { SelectedOrgUnits, SystemSettingsState } from "@scorecard/shared";
import { find } from "lodash";
import React from "react";
import { useRecoilValue } from "recoil";
import { LegendDefinition, ScorecardLegend, SpecificTarget } from "@hisptz/dhis2-analytics";

function LegendsView({ legends, legendDefinitions }: { legends: ScorecardLegend[], legendDefinitions: LegendDefinition[] }) {
	return (
		<div className="row gap-16 space-evenly">
			{legends?.map((legend: any, index: any) => {
				const { legendDefinitionId, startValue, endValue } =
				legend ?? {};
				const legendDefinition =
					find(legendDefinitions, { id: legendDefinitionId }) ?? { color: undefined };
				return (
					<div className="row gap-8 align-items-center" key={index}>
						<div
							style={{
								height: 32,
								width: 48,
								background: legendDefinition.color
							}}
						/>
						<div>{`${endValue} - ${startValue}`}</div>
					</div>
				);
			})}
		</div>
	);
}

function getTypeLabel(type: any) {
	switch (type) {
		case "period":
			return i18n.t("Period");
		case "orgUnit":
			return i18n.t("Organisation unit(s)");
		case "orgUnitLevel":
			return i18n.t("Organisation unit levels");
	}
}

export function OrgUnitSpecificTargetView({
											  specificTarget,
											  legendDefinitions,
											  onUpdate,
											  defaultLegends
										  }: { label: string; specificTarget: SpecificTarget, legendDefinitions: LegendDefinition[]; defaultLegends: ScorecardLegend[], onUpdate?: () => void; }) {
	const { legends, items } = specificTarget ?? {};
	const orgUnits: any = useRecoilValue(SelectedOrgUnits(items));

	return (
		<div
			style={{
				border: `1px solid ${colors.grey500}`,
				borderRadius: 4,
				padding: 8
			}}
			className="column gap-8 flex-wrap"
		>
			<div className="column gap-8 flex-wrap">
				<b>{i18n.t("Organisation Unit(s)")}</b>
				<div className="row gap-8 flex-wrap">
					{orgUnits?.map((item: any) => {
						return (
							<Tag key={`${item}-tag`}>{item.displayName}</Tag>
						);
					})}
				</div>
			</div>
			<div>
				<p>{i18n.t("Legends")}</p>
				<LegendsView
					legends={legends}
					legendDefinitions={legendDefinitions}
				/>
			</div>
			<div>
				<p>{i18n.t(`Other Organisation Units`)}</p>
				<LegendsView
					legends={defaultLegends}
					legendDefinitions={legendDefinitions}
				/>
			</div>
			{
				onUpdate && (<div className="row gap-8 justify-content-end">
					<Button onClick={onUpdate}>{i18n.t("Update")}</Button>
				</div>)
			}
		</div>
	);
}

export function PeriodSpecificTargetView({
											 specificTarget,
											 legendDefinitions,
											 onUpdate,
											 defaultLegends
										 }: { specificTarget: SpecificTarget, legendDefinitions: LegendDefinition[]; defaultLegends: ScorecardLegend[], onUpdate?: () => void }) {
	const { legends, type, items } = specificTarget ?? {};
	const { calendar } = useRecoilValue(SystemSettingsState);

	return (
		<div
			style={{
				border: `1px solid ${colors.grey500}`,
				borderRadius: 4,
				padding: 8
			}}
			className="column gap-8 flex-wrap"
		>
			<div className="column gap-8 flex-wrap">
				<b>{getTypeLabel(type)}</b>
				<div className="row gap-8 flex-wrap">
					{items?.map((item: any) => {
						return (
							<Tag key={`${item}-tag`}>
								{
									createFixedPeriodFromPeriodId({
										calendar: calendar,
										periodId: item
									}).displayName
								}
							</Tag>
						);
					})}
				</div>
			</div>
			<div>
				<p>{i18n.t("Legends")}</p>
				<LegendsView
					legends={legends}
					legendDefinitions={legendDefinitions}
				/>
			</div>
			<div>
				<p>{i18n.t(`Other ${getTypeLabel(type)}`)}</p>
				<LegendsView
					legends={defaultLegends}
					legendDefinitions={legendDefinitions}
				/>
			</div>
			<div className="row gap-8 justify-content-end">
				<Button onClick={onUpdate}>{i18n.t("Update")}</Button>
			</div>
		</div>
	);
}
