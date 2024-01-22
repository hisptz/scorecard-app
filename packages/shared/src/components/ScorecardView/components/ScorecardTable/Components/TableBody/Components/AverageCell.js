import {head, last, round} from "lodash";
import PropTypes from "prop-types";
import React, {useState} from "react";
import {useRecoilValue} from "recoil";
import {LinkedCellSvg, SingleCellSvg} from "../../../../../../index";
import {OrgUnitLevels, ScorecardLegendDefinitionSelector, ScorecardViewState} from "../../../../../../../state";
import {getLegend} from "../../../../../../../utils";


function SingleAverageCell({cellRef, dataSources, values, bold, period, orgUnit}) {

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
        specificTargets: dataSource?.specificTargets,
        period,
        orgUnit
    }) ?? {};
    if (head(values) === undefined) {
        return null;
    }

    return <SingleCellSvg
        cellRef={cellRef}
        color={cellColor}
        bold={bold}
        value={head(values) !== undefined ? round(head(values), 2) : ""}
    />
}

function LinkedAverageCell({cellRef, dataSources, values, bold, period, orgUnit}) {
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
        orgUnit,
        period,
        specificTargets: topDataSource?.specificTargets
    }) ?? {};

    const {color: bottomCellColor} =
    getLegend(last(values), bottomDataSource?.legends, {
        max: bottomDataSource?.weight,
        defaultLegends: defaultLegendDefinitions,
        dataOrgUnitLevel: {},
        orgUnitLevels,
        legendDefinitions,
        orgUnit,
        period,
        specificTargets: bottomDataSource?.specificTargets,
    }) ?? {};

    return (
        <LinkedCellSvg
            cellRef={cellRef}
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
    orgUnit: PropTypes.string,
    period: PropTypes.string,
};
LinkedAverageCell.propTypes = {
    values: PropTypes.arrayOf(PropTypes.any).isRequired,
    bold: PropTypes.bool,
    dataSources: PropTypes.arrayOf(PropTypes.any),
    orgUnit: PropTypes.string,
    period: PropTypes.string,
};


function ComplexAverageCell({value, bold, dataSources, period, orgUnit}) {
    const values = Object.values(value);

    const [tableCellRef, setTableCellRef] = useState();

    return (
        <td ref={setTableCellRef} className="data-cell" align="center">
            {values.length > 1 ? (
                <LinkedAverageCell cellRef={tableCellRef} period={period} orgUnit bold={bold} dataSources={dataSources}
                                   values={values}/>
            ) : (
                <SingleAverageCell cellRef={tableCellRef} period={period} orgUnit={orgUnit} bold={bold}
                                   dataSources={dataSources}
                                   values={values}/>
            )}
        </td>
    );
}

ComplexAverageCell.propTypes = {
    value: PropTypes.any.isRequired,
    bold: PropTypes.bool,
    dataSources: PropTypes.arrayOf(PropTypes.any),
    orgUnit: PropTypes.string,
    period: PropTypes.string,
};


export default function AverageCell({value, bold, dataSources, orgUnit, period}) {

    const [singleCellRef, setSingleCellRef] = useState();

    if (value === undefined) {
        return null;
    }

    if (typeof value === "number") {

        return (
            <td ref={setSingleCellRef} className="data-cell" align="center">
                <SingleCellSvg cellRef={singleCellRef} bold={bold} value={value ? round(value, 2) : ""}/>
            </td>
        );
    }

    return <ComplexAverageCell orgUnit={orgUnit} period={period} value={value} bold={bold} dataSources={dataSources}/>
}

AverageCell.propTypes = {
    value: PropTypes.any.isRequired,
    bold: PropTypes.bool,
    dataSources: PropTypes.arrayOf(PropTypes.any),
    orgUnit: PropTypes.string,
    period: PropTypes.string,
};
