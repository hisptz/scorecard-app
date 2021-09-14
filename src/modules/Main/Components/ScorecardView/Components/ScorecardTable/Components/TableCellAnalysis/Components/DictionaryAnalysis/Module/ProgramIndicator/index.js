import Introduction from "./Components/Introduction";
import React from 'react'
import DataSource from "./Components/DataSource/dataSource";
import ProgramIndicatorFacts from "./Components/facts/ProgramIndicatorFacts";
import LegendsAnalysis from "./Components/legendsAnalysis/legendsAnalysis";
import CalculationDetails from "./Components/calculationDetails";
import DataElementSIndicator from "../../Shared/Componets/dataElementsInIndicator/dataElementsIndicator";
import AccessibilityAndSharing from "../../Shared/Componets/AccesibilityAndSharing";
import RelatedIndicator from "./Components/RelatedIndicator";


export default function ProgramIndicatorPage({id}){


    return <div>
        <Introduction id={id} />
        <DataSource id={id} />
        <ProgramIndicatorFacts id={id} />
        <LegendsAnalysis id={id} />
        <RelatedIndicator id={id} resourceType={"Program Indicator"} />
        <CalculationDetails id={id} />
        <DataElementSIndicator resourceType={"Program Indicator"}/>
        <AccessibilityAndSharing id={id} resourceType={"programIndicators"} />
    </div>
}