import {head, last, round} from "lodash";
import PropTypes from "prop-types";
import React from "react";
import {useRecoilValue} from "recoil";
import {OrgUnitLevels} from "../../../../../../../../../core/state/orgUnit";
import {ScorecardLegendDefinitionSelector, ScorecardViewState} from "../../../../../../../../../core/state/scorecard";
import LinkedCellSvg from "../../../../../../../../../shared/Components/ScorecardCell/Components/LinkedCellSvg";
import SingleCellSvg from "../../../../../../../../../shared/Components/ScorecardCell/Components/SingleCellSvg";
import {getLegend} from "../../../../../../../../../shared/utils/utils";


function SingleAverageCell({dataSources, values, bold}) {

    const [dataSource] = dataSources ?? [];
    const defaultLegendDefinitions = useRecoilValue(
        ScorecardLegendDefinitionSelector(true)
    );

    const orgUnitLevels = useRecoilValue(OrgUnitLevels);
    const legendDefinitions = useRecoilValue(
        ScorecardViewState("legendDefinitions")
    );

    const {color: cellColor} =
    getLegend(head(values), dataSource?.legends, {
        max: dataSource?.weight,
        defaultLegends: defaultLegendDefinitions,
        dataOrgUnitLevel: {},
        orgUnitLevels,
        legendDefinitions,
    }) ?? {};
    console.log(values)

    if (head(values) === undefined) {
        return null;
    }

    return <SingleCellSvg
        color={cellColor}
        bold={bold}
        value={head(values) !== undefined ? round(head(values), 2) : ""}
    />
}

function LinkedAverageCell({dataSources, values, bold}) {
    const defaultLegendDefinitions = useRecoilValue(
        ScorecardLegendDefinitionSelector(true)
    );
    const orgUnitLevels = useRecoilValue(OrgUnitLevels);
    const legendDefinitions = useRecoilValue(
        ScorecardViewState("legendDefinitions")
    );
    const [topDataSource, bottomDataSource] = dataSources ?? [];

    const {color: topCellColor} =
    getLegend(head(values), topDataSource?.legends, {
        max: topDataSource?.weight,
        defaultLegends: defaultLegendDefinitions,
        dataOrgUnitLevel: {},
        orgUnitLevels,
        legendDefinitions,
    }) ?? {};

    const {color: bottomCellColor} =
    getLegend(last(values), bottomDataSource?.legends, {
        max: bottomDataSource?.weight,
        defaultLegends: defaultLegendDefinitions,
        dataOrgUnitLevel: {},
        orgUnitLevels,
        legendDefinitions,
    }) ?? {};

    return (
        <LinkedCellSvg
            topColor={topCellColor}
            bottomColor={bottomCellColor}
            bold={bold}
            topValue={head(values) ? round(+head(values), 2) : ""}
            bottomValue={last(values) ? round(last(values), 2) : ""}
        />
    )


}

SingleAverageCell.propTypes = {
    values: PropTypes.arrayOf(PropTypes.any).isRequired,
    bold: PropTypes.bool,
    dataSources: PropTypes.arrayOf(PropTypes.any),
};
LinkedAverageCell.propTypes = {
    values: PropTypes.arrayOf(PropTypes.any).isRequired,
    bold: PropTypes.bool,
    dataSources: PropTypes.arrayOf(PropTypes.any),
};


function ComplexAverageCell({value, bold, dataSources}) {
    const values = Object.values(value);
    return (
        <td className="data-cell" align="center">
            {values.length > 1 ? (
                <LinkedAverageCell bold={bold} dataSources={dataSources} values={values}/>
            ) : (
                <SingleAverageCell bold={bold} dataSources={dataSources} values={values}/>
            )}
        </td>
    );
}

ComplexAverageCell.propTypes = {
    value: PropTypes.any.isRequired,
    bold: PropTypes.bool,
    dataSources: PropTypes.arrayOf(PropTypes.any),
};


export default function AverageCell({value, bold, dataSources}) {
    if (value === undefined) {
        return null;
    }

    if (typeof value === "number") {
        return (
            <td className="data-cell" align="center">
                <SingleCellSvg bold={bold} value={value ? round(value, 2) : ""}/>
            </td>
        );
    }

    return <ComplexAverageCell value={value} bold={bold} dataSources={dataSources}/>
}

AverageCell.propTypes = {
    value: PropTypes.any.isRequired,
    bold: PropTypes.bool,
    dataSources: PropTypes.arrayOf(PropTypes.any),
};
