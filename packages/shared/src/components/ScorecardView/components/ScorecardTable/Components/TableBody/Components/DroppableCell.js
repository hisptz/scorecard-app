import {colors} from "@dhis2/ui";
import {debounce} from "lodash";
import PropTypes from "prop-types";
import React, {useRef} from "react";
import {useDrop} from "react-dnd";
import {useSetRecoilState} from "recoil";
import {ScorecardTableOrientationState} from "../../../../../../../state";
import {Orientation} from "../../../../../../../constants";


export default function DroppableCell({accept, children}) {
    const setOrientation = useSetRecoilState(ScorecardTableOrientationState);

    const onDrop = useRef(debounce(setOrientation));

    const [{canDrop}, dropRef] = useDrop({
        accept,
        drop: () => {
            onDrop.current((prevState) => {
                return prevState === Orientation.ORG_UNIT_VS_DATA
                    ? Orientation.DATA_VS_ORG_UNIT
                    : Orientation.ORG_UNIT_VS_DATA;
            });
            return undefined;
        },
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
            canDrop: !!monitor.canDrop(),
        }),
    });

    return (
        <div
            ref={dropRef}
            className="column center align-items-center"
            style={{
                border: canDrop && `2px dashed ${colors.grey700}`,
                background: canDrop && `${colors.grey100}`,
                height: canDrop ? 47 : "100%",
                width: "100%",
            }}
        >
            {children}
        </div>
    );
}

DroppableCell.propTypes = {
    accept: PropTypes.arrayOf(PropTypes.string).isRequired,
    children: PropTypes.node.isRequired,
};
