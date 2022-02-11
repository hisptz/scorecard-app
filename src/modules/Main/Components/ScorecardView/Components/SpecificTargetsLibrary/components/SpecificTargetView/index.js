import i18n from '@dhis2/d2-i18n'
import {colors} from '@dhis2/ui'
import {find} from "lodash";
import PropTypes from 'prop-types'
import React from 'react'
import {useRecoilValue} from "recoil";
import {SelectedOrgUnits} from "../../../../../../../../core/state/orgUnit";
import {ScorecardViewState} from "../../../../../../../../core/state/scorecard";

function LegendsView({legends}) {
    const legendDefinitions = useRecoilValue(ScorecardViewState("legendDefinitions"));

    return (
        <div className="column gap-8">
            <table>
                <col width="60%"/>
                <col width="20%"/>
                <col width="20%"/>
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
                        const legendDefinition = find(legendDefinitions, {id: legend.legendDefinitionId});
                        return (
                            <tr key={`${legend.id}-view`}>
                                <td>
                                    <table>
                                        <col width="20%"/>
                                        <col width="80%"/>
                                        <tbody>
                                        <tr>
                                            <td>
                                                <div style={{
                                                    height: 24,
                                                    width: 32,
                                                    background: legendDefinition.color
                                                }}/>
                                            </td>
                                            <td>{legendDefinition.name}</td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </td>
                                <td align="center">{legend?.startValue}</td>
                                <td align="center">{legend?.endValue}</td>
                            </tr>
                        )
                    })
                }
                </tbody>
            </table>

        </div>
    )
}

LegendsView.propTypes = {
    legends: PropTypes.array
};


export function OrgUnitSpecificTargetView({dataSourceLabel, specificTarget}) {
    const {items, legends} = specificTarget ?? {};
    const orgUnits = useRecoilValue(SelectedOrgUnits(items))
    return (
        <div style={{maxWidth: 350, border: `1px solid ${colors.grey600}`, borderRadius: 4}}
             className="column gap-16 p-16">
            <div className="column gap-16">
                <div>
                    <b>{i18n.t("Organisation Unit(s)")}: </b> {orgUnits?.map(ou => ou.displayName)?.join(", ")}
                </div>
                <div>
                    <b>{i18n.t("Data Source")}: </b>{dataSourceLabel}
                </div>
            </div>
            <LegendsView legends={legends}/>
        </div>
    )
}

OrgUnitSpecificTargetView.propTypes = {
    dataSourceLabel: PropTypes.string,
    specificTarget: PropTypes.object
};

