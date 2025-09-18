import i18n from "@dhis2/d2-i18n";
import { Button, colors, Tag } from "@dhis2/ui";
import { createFixedPeriodFromPeriodId } from "@dhis2/multi-calendar-dates";
import { find } from "lodash";
import { LegendDefinition, ScorecardLegend, SpecificTarget } from "@hisptz/dhis2-scorecard";
import { useCalendar } from "@/shared";

function LegendsView({
						 legends,
						 legendDefinitions
					 }: {
	legends: ScorecardLegend[];
	legendDefinitions: LegendDefinition[];
}) {
	return (
		<div style={{ gap: 16 }} className="row gap-16 space-evenly">
			{legends?.map((legend, index) => {
				const { legendDefinitionId, startValue, endValue } =
				legend ?? {};
				const legendDefinition = find(legendDefinitions, {
					id: legendDefinitionId
				}) ?? { color: undefined };
				return (
					<div
						style={{ gap: 8 }}
						className="row gap-8 align-items-center"
						key={index}
					>
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

function getTypeLabel(type: "periods" | "orgUnit" | "orgUnitLevel") {
	switch (type) {
		case "periods":
			return i18n.t("Periods");
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
										  }: {
	specificTarget: SpecificTarget;
	legendDefinitions: LegendDefinition[];
	defaultLegends: ScorecardLegend[];
	onUpdate?: () => void;
}) {
	const { legends, items } = specificTarget ?? {};
	const orgUnits: { displayName: string }[] = [];

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
					{orgUnits?.map((item) => {
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
				<p>{i18n.t("Other Organisation Units")}</p>
				<LegendsView
					legends={defaultLegends}
					legendDefinitions={legendDefinitions}
				/>
			</div>
			{onUpdate && (
				<div className="row gap-8 justify-content-end">
					<Button onClick={onUpdate}>{i18n.t("Update")}</Button>
				</div>
			)}
		</div>
	);
}

export function PeriodSpecificTargetView({
											 specificTarget,
											 legendDefinitions,
											 onUpdate,
											 defaultLegends
										 }: {
	specificTarget: SpecificTarget;
	legendDefinitions: LegendDefinition[];
	defaultLegends: ScorecardLegend[];
	onUpdate?: () => void;
}) {
	const { legends, type, items } = specificTarget ?? {};
	const calendar = useCalendar();

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
					{items?.map((item) => {
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
