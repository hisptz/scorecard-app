import React from 'react'
import {formatBytes} from "../../../../Utils/Functions/FormulaFunctions";
const { Buffer } = require('buffer');
import i18n from '@dhis2/d2-i18n'

export default function Facts({functionObj}){

    let selected=functionObj

    return <div>
        <h3>{i18n.t("")} Function Facts</h3>

        <ul>
            <li>
                {
                    i18n.t("It is approximately {{variables}}  in size",
                        {
                            variables:formatBytes(Buffer.byteLength(selected?.function,'utf-8'),2)
                        })
                }
            </li>
            <li>{i18n.t("")} It has {selected?.rules?.length} associated rules</li>
            {selected?.function?.search('Fn')>=0? <li>{i18n.t("It’s using function analytics library")}</li>:"" }
            {selected?.function?.search('$.')>=0? <li>{i18n.t("It’s using jquery api library ")}</li>:"" }
            {selected?.function?.search('$.ajax')>=0? <li>{i18n.t("Performs ajax promises")}</li>:"" }
            {selected?.function?.search('../../../api/')>=0? <li>{i18n.t("Fetches from DHIS2 API without function analytics")}</li>:"" }

        </ul>

        </div>
}

