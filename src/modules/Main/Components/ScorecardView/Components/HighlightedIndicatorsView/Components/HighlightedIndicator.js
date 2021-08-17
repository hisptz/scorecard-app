import PropTypes from 'prop-types'
import React from 'react'
import {useRecoilValue} from "recoil";
import {SingleHighlightedIndicatorState} from "../../../../../../../core/state/highlightedIndicators";
import {getLegend} from "../../../../ScoreCardManagement/Components/DataConfiguration/utils";

export default function HighlightedIndicator({highlightedIndicator}) {
    const {displayName, legends, id} = highlightedIndicator ?? {};
    const value = useRecoilValue(SingleHighlightedIndicatorState(id))
    const {color} = getLegend(value, legends) ?? {}
    return (
        <div style={{background: 'white', border: '1px solid rgb(232, 237, 242)', margin: 8}}>
            <div className='row flex-1 space-between align-items-center'>
                <p style={{margin: 0, padding: '0 8px', fontSize: 14}}>{displayName}</p>
                <div style={{
                    width: 60,
                    minHeight: '100%',
                    background: color,
                    padding: 16,
                    display: "flex",
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <p style={{fontSize: 14, margin: 0}}>{value}</p>
                </div>

            </div>
        </div>
    )
}

HighlightedIndicator.propTypes = {
    highlightedIndicator: PropTypes.object.isRequired
};

