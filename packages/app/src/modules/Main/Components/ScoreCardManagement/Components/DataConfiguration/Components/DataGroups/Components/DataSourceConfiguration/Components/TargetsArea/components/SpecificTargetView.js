import i18n from '@dhis2/d2-i18n'
import {Button, colors, Tag} from '@dhis2/ui'
import {Period} from "@iapps/period-utilities";
import {SelectedOrgUnits, SystemSettingsState} from "@scorecard/shared";
import {find} from "lodash";
import PropTypes from 'prop-types'
import React from 'react'
import {useRecoilValue} from "recoil";

function LegendsView({legends, legendDefinitions}) {
    return <div className="row gap-16 space-evenly">
        {legends?.map((legend, index) => {
            const {legendDefinitionId, startValue, endValue} = legend ?? {};
            const legendDefinition = find(legendDefinitions, {id: legendDefinitionId}) ?? {};
            return (
                <div className="row gap-8 align-items-center" key={index}>
                    <div style={{height: 32, width: 48, background: legendDefinition.color}}/>
                    <div>{`${endValue} - ${startValue}`}</div>
                </div>
            )
        })}
    </div>
}

LegendsView.propTypes = {
    legendDefinitions: PropTypes.array,
    legends: PropTypes.array,
};


function getTypeLabel(type) {
    switch (type) {
        case "period":
            return i18n.t('Period');
        case "orgUnit":
            return i18n.t('Organisation unit(s)');
        case "orgUnitLevel":
            return i18n.t('Organisation unit levels');
    }
}


export function OrgUnitSpecificTargetView({specificTarget, legendDefinitions, onUpdate, defaultLegends}) {
    const {legends, items} = specificTarget ?? {};
    const orgUnits = useRecoilValue(SelectedOrgUnits(items))

    return (
        <div style={{
            border: `1px solid ${colors.grey500}`,
            borderRadius: 4,
            padding: 8
        }} className="column gap-8 flex-wrap">
            <div className="column gap-8 flex-wrap">
                <b>{i18n.t("Organisation Unit(s)")}</b>
                <div className="row gap-8 flex-wrap">
                    {
                        orgUnits?.map(item => {
                            return <Tag key={`${item}-tag`}>
                                {item.displayName}
                            </Tag>
                        })
                    }
                </div>
            </div>
            <div>
                <p>{i18n.t("Legends")}</p>
                <LegendsView legends={legends} legendDefinitions={legendDefinitions}/>
            </div>
            <div>
                <p>{i18n.t(`Other Organisation Units`)}</p>
                <LegendsView legends={defaultLegends} legendDefinitions={legendDefinitions}/>
            </div>
            <div className="row gap-8 justify-content-end">
                <Button onClick={onUpdate}>{i18n.t("Update")}</Button>
            </div>
        </div>
    )
}

export function PeriodSpecificTargetView({specificTarget, legendDefinitions, onUpdate, defaultLegends}) {
    const {legends, type, items} = specificTarget ?? {};
    const {calendar} = useRecoilValue(SystemSettingsState);

    return (
        <div style={{
            border: `1px solid ${colors.grey500}`,
            borderRadius: 4,
            padding: 8
        }} className="column gap-8 flex-wrap">
            <div className="column gap-8 flex-wrap">
                <b>{getTypeLabel(type)}</b>
                <div className="row gap-8 flex-wrap">
                    {
                        items?.map(item => {
                            return <Tag key={`${item}-tag`}>
                                {new Period().setPreferences({allowFuturePeriods: true}).setCalendar(calendar).getById(item)?.name}
                            </Tag>
                        })
                    }
                </div>
            </div>
            <div>
                <p>{i18n.t("Legends")}</p>
                <LegendsView legends={legends} legendDefinitions={legendDefinitions}/>
            </div>
            <div>
                <p>{i18n.t(`Other ${getTypeLabel(type)}`)}</p>
                <LegendsView legends={defaultLegends} legendDefinitions={legendDefinitions}/>
            </div>
            <div className="row gap-8 justify-content-end">
                <Button onClick={onUpdate}>{i18n.t("Update")}</Button>
            </div>
        </div>
    )
}


OrgUnitSpecificTargetView.propTypes = {
    defaultLegends: PropTypes.array,
    legendDefinitions: PropTypes.array,
    specificTarget: PropTypes.object,
    onDelete: PropTypes.func,
    onUpdate: PropTypes.func,
};

PeriodSpecificTargetView.propTypes = {
    defaultLegends: PropTypes.array,
    legendDefinitions: PropTypes.array,
    specificTarget: PropTypes.object,
    onDelete: PropTypes.func,
    onUpdate: PropTypes.func,
};
