import {colors} from '@dhis2/ui'
import React from 'react'
import JsxParser from 'react-jsx-parser'
import {useRecoilValue} from "recoil";
import {ScorecardStateSelector} from "../../../../../../core/state/scorecard";

export default function ScorecardHeader() {
    const customHeader = useRecoilValue(ScorecardStateSelector('customHeader'))
    const title = useRecoilValue(ScorecardStateSelector('title'))
    const subtitle = useRecoilValue(ScorecardStateSelector('subtitle'))
    return (
        <div>
            {
                customHeader ? <JsxParser
                    autoCloseVoidElements
                    onError={console.log}
                    bindings={{
                        title,
                        subtitle
                    }} jsx={customHeader}
                /> : <div className='column center align-items-center'>
                    <h1 style={{margin: 8}} >{title}</h1>
                    <h3 style={{color: colors.grey600, margin: 0}}>{subtitle}</h3>
                </div>
            }
        </div>
    )
}
