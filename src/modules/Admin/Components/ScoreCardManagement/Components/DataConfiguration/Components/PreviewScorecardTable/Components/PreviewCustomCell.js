import PropTypes from "prop-types";
import React, {useMemo} from "react";
import {generateRandomValues} from "../../../../../../../../../shared/utils/utils";
import {getLegend} from "../../../utils";
import CustomLinkedCell from "./CustomLinkedCell";

export default function PreviewCustomCell({config}) {
    const hasLinked = config?.dataSources.length > 1;
    const [top, bottom] = config?.dataSources ?? [];
    const {legends, showColors, id} = top ?? {};
    const value = useMemo(generateRandomValues, []);
    const legend = getLegend(value, legends)
    return hasLinked ? <CustomLinkedCell bottom={bottom} top={top}/> :
        <td className='data-cell' style={{background: `${showColors && legend?.color}`}} align='center'
            key={`${id}-data`} id={id}>{value}</td>
}

PreviewCustomCell.propTypes = {
    config: PropTypes.object.isRequired
};
