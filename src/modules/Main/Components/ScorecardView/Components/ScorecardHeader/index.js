import {colors} from '@dhis2/ui'
import React from 'react'
import JsxParser from 'react-jsx-parser'
import {useRecoilValue} from "recoil";
import {ScorecardConfigStateSelector, ScorecardViewSelector} from "../../../../../../core/state/scorecard";

export default function ScorecardHeader() {
    const {title: showTitle} = useRecoilValue(ScorecardViewSelector('options'))
    const customHeader = useRecoilValue(ScorecardConfigStateSelector('customHeader'))
    const title = useRecoilValue(ScorecardConfigStateSelector('title'))
    const subtitle = useRecoilValue(ScorecardConfigStateSelector('subtitle'))
    return (
        showTitle ? <div>
            {
                customHeader ? <JsxParser
                    autoCloseVoidElements
                    onError={console.log}
                    bindings={{
                        title,
                        subtitle
                    }} jsx={customHeader}
                /> : <div className='column center align-items-center'>
                    <h1 style={{margin: 8}}>{title}</h1>
                    <h3 style={{color: colors.grey600, margin: 0}}>{subtitle}</h3>
                </div>
            }
        </div> : null
    )
}
