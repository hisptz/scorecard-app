import {colors, Tooltip} from '@dhis2/ui'
import {debounce} from 'lodash'
import PropTypes from 'prop-types'
import React, {useRef} from 'react'
import {useDrop} from "react-dnd";
import {useSetRecoilState} from "recoil";
import {ScorecardTableOrientationState} from "../../../../../../../core/state/scorecard";

export default function DroppableCell({accept, children}) {
    const setOrientation = useSetRecoilState(ScorecardTableOrientationState)

    const onDrop = useRef(debounce(setOrientation))

    const [{canDrop}, dropRef] = useDrop({
        accept,
        drop: () => {
            onDrop.current(prevState => prevState === 'orgUnitsVsData' ? 'dataVsOrgUnits' : 'orgUnitsVsData')
            return undefined;
        },
        collect: monitor => ({
            isOver: !!monitor.isOver(),
            canDrop: !!monitor.canDrop()
        })
    })

    return (
        <div
            ref={dropRef}
            className="column center align-items-center"
            style={{
                border: canDrop && `2px dashed ${colors.grey700}`,
                background: canDrop && `${colors.grey100}`,
                height: '100%',
                width: '100%'
            }}
        >
            {children}
        </div>
    )
}

DroppableCell.propTypes = {
    accept: PropTypes.arrayOf(PropTypes.string).isRequired,
    children: PropTypes.node.isRequired,
};
