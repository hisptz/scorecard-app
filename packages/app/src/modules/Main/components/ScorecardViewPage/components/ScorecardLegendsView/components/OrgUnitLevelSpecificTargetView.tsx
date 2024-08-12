import { OrgUnitLevelLegend, useScorecardMeta } from "@hisptz/dhis2-analytics";
import { colors } from "@dhis2/ui";
import i18n from "@dhis2/d2-i18n";
import { LegendsView } from "./LegendView";


export interface OrgUnitSpecificTargetViewProps {
	specificTarget: OrgUnitLevelLegend;
	label: string;
}


export function OrgUnitLevelSpecificTargetView({ specificTarget, label }: OrgUnitSpecificTargetViewProps) {
	const meta = useScorecardMeta();
	const orgUnitLevels = meta?.orgUnitLevels ?? [];


	return (
		<div style={{ maxWidth: 350, border: `1px solid ${colors.grey600}`, borderRadius: 4, gap: 8 }}
			 className="column gap-16 p-16">
			<div>
				<b>{i18n.t("Data Source")}: </b>{label}
			</div>
			<div style={{ gap: 16 }} className="column gap-8">
				{
					Object.keys(specificTarget).map(key => {
						const orgUnitLevel = orgUnitLevels.find((level) => level.id === key);
						const legends = specificTarget[key];
						return (
							<div>
								<div className="column gap-16">
									<div>
										<b>{i18n.t("Organisation Unit Level")}: {orgUnitLevel?.displayName}</b>
									</div>
								</div>
								<LegendsView legends={legends} />
							</div>
						);
					})
				}
			</div>
		</div>
	);
}
