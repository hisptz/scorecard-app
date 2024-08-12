import { SpecificTarget } from "@hisptz/dhis2-analytics";
import { colors } from "@dhis2/ui";
import i18n from "@dhis2/d2-i18n";
import { LegendsView } from "./LegendView";
import { useCalendar } from "@scorecard/shared";
import { createFixedPeriodFromPeriodId } from "@dhis2/multi-calendar-dates";


export interface OrgUnitSpecificTargetViewProps {
	specificTarget: SpecificTarget;
	label: string;
}


export function PeriodSpecificTargetView({ specificTarget, label }: OrgUnitSpecificTargetViewProps) {
	const items = specificTarget.items;
	const calendar = useCalendar();
	const periods = items.map((periodId) => createFixedPeriodFromPeriodId({
		calendar,
		periodId
	}));

	return (
		<div style={{ maxWidth: 350, border: `1px solid ${colors.grey600}`, borderRadius: 4 }}
			 className="column gap-16 p-16">
			<div className="column gap-16">
				<div>
					<b>{i18n.t("Period(s)")}: </b> {periods?.map(ou => ou.displayName)?.join(", ")}
				</div>
				<div>
					<b>{i18n.t("Data Source")}: </b>{label}
				</div>
			</div>
			<LegendsView legends={specificTarget.legends} />
		</div>
	);
}
