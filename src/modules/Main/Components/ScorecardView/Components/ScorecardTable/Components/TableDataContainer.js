import PropTypes from 'prop-types'
import React, {useEffect, useState} from 'react'
import LinkedCellSvg from "../../../../../../../shared/Components/ScorecardCell/Components/LinkedCellSvg";
import SingleCellSvg from "../../../../../../../shared/Components/ScorecardCell/Components/SingleCellSvg";
import {generateRandomValues} from "../../../../../../../shared/utils/utils";
import {getLegend} from "../../../../../../Admin/Components/ScoreCardManagement/Components/DataConfiguration/utils";

export default function DataContainer({dataSources, orgUnitId, periodId}) {
    const [data, setData] = useState();
    const [top, bottom] = dataSources ?? [];
    const topValue = generateRandomValues(100)
    const topLegend = getLegend(topValue, top?.legends)


    useEffect(() => {
        //function
    }, [orgUnitId, periodId, dataSources]);


    const bottomValue = generateRandomValues(100);
    const bottomLegend = getLegend(bottomValue, bottom?.legends)

    return (
        dataSources?.length > 1 ? <LinkedCellSvg topValue={topValue} topColor={topLegend?.color} bottomValue={bottomValue} bottomColor={bottomLegend?.color}  />: <SingleCellSvg value={`${topValue}`} color={topLegend?.color} />
    )
}

DataContainer.propTypes = {
    dataSources: PropTypes.array,
    orgUnitId: PropTypes.string,
    periodId: PropTypes.string
};


