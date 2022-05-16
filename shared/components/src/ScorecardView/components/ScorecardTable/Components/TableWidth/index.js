import React from 'react'
import {useRecoilValue} from "recoil";
import {ScorecardTableConfigState} from "@hisptz/scorecard-state";


export default function TableWidth({orgUnits}) {
    const {nameColumnWidth} = useRecoilValue(ScorecardTableConfigState(orgUnits))

    return (
        <colgroup>
            <col width="50px"/>
            <col width="50px"/>
            <col width={`${nameColumnWidth}`}/>
        </colgroup>
    )
};