import { useParams,useHistory } from 'react-router-dom'
import CalculationDetails from './Components/calculationDetails/Index'

import CompletenessDataSources from './Components/CompletenessDataSource/completenessDataSources'
import DataElementSIndicator from './Components/dataElementsInIndicator/dataElementsIndicator'

import DataSource from './Components/DataSource/dataSource'

import IndicatorFacts from './Components/indicatorFacts/indicatorFacts'
import Introduction from './Components/introduction/introduction'
import LegendsAnalysis from './Components/legendsAnalysis/legendsAnalysis'
import ProgramIndicatorIndicator from "./Components/ProgramIndicator";
import DatasetsReportingRates from "./Components/DataSetReportingRate";
import {useSetRecoilState} from "recoil";
import {
    dataElementsStateDictionary,
    dataSetReportingRatesStateDictionary,
    programIndicatorStateDictionary
} from "../../Store";



export default function IndicatorPage(props){

    // const { id } = useParams()

    const id=props.id

    useSetRecoilState(dataElementsStateDictionary)([])
    useSetRecoilState(programIndicatorStateDictionary)([])
    useSetRecoilState(dataSetReportingRatesStateDictionary)([])



    return (<div style={{display:"flex",flexDirection:"column"}}>
       <Introduction id={id} />

       <DataSource id={id} />

       <IndicatorFacts id={id} />

       <LegendsAnalysis id={id} />

       <CalculationDetails id={id} />

       <DataElementSIndicator />

       <ProgramIndicatorIndicator    />

        <DatasetsReportingRates />

        {/*<CompletenessDataSources />*/}

       </div>)
}


 