import React from 'react'
import Introduction from "./Components/Introduction";
import DataSource from "./Components/DataSource";
import Rules from "./Components/Rules";
import Facts from "./Components/Facts";
import ApiEndPoint from "./Components/ApiEndPoint";
import AccessibilityAndSharingFunction from "./Components/AccessibilityAndSharing";
import {functionDictionarySourceSelector} from "../../Store/FunctionDictionary";
import {useRecoilValue} from "recoil";
import AccessibilityAndSharing from "./Components/AccessibilityAndSharing";



export default function FunctionPage({ruleObj,functionObj}){

    return <div>
        <Introduction ruleObj={ruleObj} functionObj={functionObj}  />
        <DataSource json={ruleObj?.json}/>
        <Rules ruleObj={ruleObj} functionObj={functionObj} />
        <Facts functionObj={functionObj} />
        {/*<ApiEndPoint selected={selected} />*/}

        <AccessibilityAndSharing id={functionObj?.id} />
    </div>
}