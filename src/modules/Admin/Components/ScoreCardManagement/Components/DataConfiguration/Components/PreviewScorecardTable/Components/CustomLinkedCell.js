import PropTypes from 'prop-types'
import React, {useEffect, useMemo, useRef, useState} from "react";
import {generateRandomValues} from "../../../../../../../../../shared/utils/utils";
import {getLegend} from "../../../utils";


function LinkedCellSvg({topValue, bottomValue, topColor, bottomColor}) {
    const [update, setUpdate] = useState()
    const ref = useRef(HTMLDivElement)
    const height = 47;
    const width = ref?.current?.offsetWidth;

    const onUpdate = () => {
        setUpdate(!update)
    };

    useEffect(onUpdate, [])
    useEffect(() => {
        window.addEventListener('resize', onUpdate)
        return () => {
            window.removeEventListener('resize', onUpdate)
        };
    });

    return (
        <div ref={ref}>
            <svg display='block' strokeWidth={0} viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none">
                <polygon points={`0,0 0,${height} ${width}, 0`} style={{fill: topColor ?? '#FFFFFF', strokeWidth: 1, stroke: 'rgb(232, 237, 242)'}}/>
                <text fontSize={14} x="5%" y="40%">{topValue}</text>
                <polygon points={`${width},0 ${width},${height} 0,${height}`} style={{fill: bottomColor ?? '#FFFFFF', strokeWidth: 1, stroke: 'rgb(232, 237, 242)' }}/>
                <text fontSize={14} x="90%" y="75%">{bottomValue}</text>
            </svg>
        </div>
    )
}


LinkedCellSvg.propTypes = {
    bottomValue: PropTypes.any.isRequired,
    topValue: PropTypes.any.isRequired,
    bottomColor: PropTypes.string,
    topColor: PropTypes.string
};


export default function CustomLinkedCell({top, bottom}) {
    const {legends: topLegends, showColors: showTopColors} = top ?? {};
    const {legends: bottomLegends, showColors: showBottomColors} = bottom ?? {};
    const topValue = useMemo(generateRandomValues, []);
    const bottomValue = useMemo(generateRandomValues, []);
    const {color: topColor} = getLegend(topValue, topLegends) ?? {}
    const {color: bottomColor} = getLegend(bottomValue, bottomLegends) ?? {}
    return (
        <td className='linked-table-cell data-cell'>
            <LinkedCellSvg topColor={showTopColors && topColor} bottomColor={showBottomColors && bottomColor}
                           bottomValue={bottomValue} topValue={topValue}/>
        </td>
    )
}

CustomLinkedCell.propTypes = {
    bottom: PropTypes.object.isRequired,
    top: PropTypes.object.isRequired,
};

