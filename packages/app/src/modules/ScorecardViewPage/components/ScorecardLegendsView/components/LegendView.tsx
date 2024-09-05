import { LegendDefinition, ScorecardLegend, useScorecardConfig } from "@hisptz/dhis2-analytics";
import i18n from "@dhis2/d2-i18n";
import { find } from "lodash";

export interface LegendsViewProps {
	legends: ScorecardLegend[];
}

export function LegendsView({ legends }: LegendsViewProps) {
	const config = useScorecardConfig();
	const legendDefinitions = config.legendDefinitions ?? [];

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
				{
					legends?.map(legend => {
						const legendDefinition = find(legendDefinitions, { id: legend.legendDefinitionId });
						return (
							<tr key={`${legend.id}-view`}>
								<td>
									<table>
										<col width="20%" />
										<col width="80%" />
										<tbody>
										<tr>
											<td>
												<div style={{
													height: 24,
													width: 32,
													background: legendDefinition?.color
												}} />
											</td>
											<td>{legendDefinition?.name}</td>
										</tr>
										</tbody>
									</table>
								</td>
								<td align="center">{legend?.startValue}</td>
								<td align="center">{legend?.endValue}</td>
							</tr>
						);
					})
				}
				</tbody>
			</table>

		</div>
	);
}


export interface LegendViewProps {
	legend: LegendDefinition;
}

export function LegendView({ legend }: LegendViewProps) {
	const { color, name, id } = legend;
	return (
		<div key={id} className="row align-items-center">
			<div
				style={{
					width: 60,
					height: 25,
					background: color,
					border: "1px solid rgb(232, 237, 242)",
					padding: 16
				}}
			/>
			<p style={{ paddingLeft: 8, marginRight: 8 }}>{name}</p>
		</div>
	);
}
