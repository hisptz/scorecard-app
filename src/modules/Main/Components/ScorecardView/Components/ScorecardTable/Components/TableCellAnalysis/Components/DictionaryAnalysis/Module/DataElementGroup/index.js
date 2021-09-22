
import React from "react";
import Introduction from "./Components/Introduction";
import DataSources from "./Components/DataSources";
import Facts from "./Components/Facts";
import RelatedIndicator from "./Components/RelatedIndicator";
import DataElementSIndicator from "../../Shared/Componets/dataElementsInIndicator/dataElementsIndicator";
import AccessibilityAndSharing from "../../Shared/Componets/AccesibilityAndSharing";


export default function DataElementGroupPage(props){

   const id=props.id


    return  <div style={{display:"flex",flexDirection:"column"}}>
                <Introduction id={id} />
                <DataSources id={id} />
                <Facts id={id}/>
                <RelatedIndicator id={id} />
                <DataElementSIndicator resourceType={"Data Element Group"}/>
                <AccessibilityAndSharing id={id} resourceType={"dataElementGroups"} />
            </div>
}