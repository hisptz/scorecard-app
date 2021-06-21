import {Button, ButtonStrip} from '@dhis2/ui'
import {Step, StepLabel, Stepper} from "@material-ui/core";
import React, {useRef, useState} from 'react'
import useMediaQuery from "../../../../shared/hooks/useMediaQuery";
import AccessScorecardForm from "./Components/Access";
import DataConfigurationScorecardForm from "./Components/DataConfiguration";
import GeneralScorecardForm from "./Components/General";
import HighlightedIndicatorsScorecardForm from "./Components/HighlightedIndicators";
import OptionsScorecardForm from "./Components/Options";

const steps = [
    {
        label: 'General',
        component: GeneralScorecardForm
    },
    {
        label: 'Data Configuration',
        component: DataConfigurationScorecardForm
    },
    {
        label: 'Highlighted Indicators',
        component: HighlightedIndicatorsScorecardForm
    },
    {
        label: 'Access',
        component: AccessScorecardForm
    },
    {
        label: 'Options',
        component: OptionsScorecardForm
    }
];

export default function ScoreCardManagement() {
    const {width} = useMediaQuery()
    const [activeStep, setActiveStep] = useState(steps[0]);
    const formRef = useRef(HTMLFormElement);

    const Component = activeStep.component;

    return (
        <div className='container'>
            <div className='column'>
                <div >
                    <Stepper>
                        {
                            steps.map(step => (
                                <Step style={step === activeStep ? {background: '#00695c'} : undefined}
                                      active={step === activeStep} onClick={() => setActiveStep(step)}
                                      key={`${step.label}-step`}>
                                    <StepLabel>{step.label}</StepLabel>
                                </Step>
                            ))
                        }
                    </Stepper>
                </div>
                <div className='row'>
                    <div className='column center' style={{flex: 1}}>
                        <div className='container bordered background-white center' style={{width: width * .96}}>
                            <div className='column p-16' style={{height: '100%', justifyContent: 'space-between'}}>
                                {<Component formReference={formRef}/>}
                                <ButtonStrip end>
                                    <Button>Cancel</Button>
                                    <Button primary onClick={() => formRef.current.requestSubmit()}>Next</Button>
                                </ButtonStrip>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
