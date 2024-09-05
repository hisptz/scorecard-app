import { SpecificTarget } from "@hisptz/dhis2-analytics";
import { CircularLoader, colors } from "@dhis2/ui";
import i18n from "@dhis2/d2-i18n";
import { LegendsView } from "./LegendView";
import { useOrgUnits } from "../../../hooks/orgUnit";


export interface OrgUnitSpecificTargetViewProps {
	specificTarget: SpecificTarget;
	label: string;
}


export function OrgUnitSpecificTargetView({ specificTarget, label }: OrgUnitSpecificTargetViewProps) {
	const items = specificTarget.items;
	const { loading, orgUnits } = useOrgUnits(items);

	if (loading) {
		return (
			<div style={{ minWidth: 200, minHeight: 200 }} className="column align-items-center justify-content-center">
				<CircularLoader extrasmall />
			</div>
		);
	}

	return (
		<div style={{ maxWidth: 350, border: `1px solid ${colors.grey600}`, borderRadius: 4 }}
			 className="column gap-16 p-16">
			<div className="column gap-16">
				<div>
					<b>{i18n.t("Organisation Unit(s)")}: </b> {orgUnits?.map(ou => ou.displayName)?.join(", ")}
				</div>
				<div>
					<b>{i18n.t("Data Source")}: </b>{label}
				</div>
			</div>
			<LegendsView legends={specificTarget.legends} />
		</div>
	);
}
