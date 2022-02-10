import i18n from '@dhis2/d2-i18n'
import {Button, Tag, colors} from '@dhis2/ui'
import {Period} from "@iapps/period-utilities";
import {find} from "lodash";
import PropTypes from 'prop-types'
import React from 'react'

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

function getItemDisplayName(type, item) {
    switch (type) {
        case "period":
            return new Period()?.getById(item)?.name;
        case "orgUnit":
            return item.name;
        case "orgUnitLevel":
            return item.name;
    }
}


export default function SpecificTargetView({specificTarget, legendDefinitions, onUpdate}) {
    const { legends, type, items } = specificTarget ?? {};

    return (
        <div style={{
            border: `1px solid ${colors.grey500}`,
            borderRadius: 4,
            padding: 8
        }} className="column gap-8 ">
            <div className="row gap-16 align-items-center">
                <b>{getTypeLabel(type)}</b>
                {
                    items?.map(item => (
                        <Tag key={`${item}-tag`}>
                            {getItemDisplayName(type, item)}
                        </Tag>
                    ))
                }
            </div>
            <div>
                <LegendsView legends={legends} legendDefinitions={legendDefinitions}/>
            </div>
            <div className="row justify-content-end">
                <Button onClick={onUpdate}>Update</Button>
            </div>
        </div>
    )
}


SpecificTargetView.propTypes = {
    specificTarget: PropTypes.object
};
