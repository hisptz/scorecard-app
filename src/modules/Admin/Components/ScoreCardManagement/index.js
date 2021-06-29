import {Button, ButtonStrip} from '@dhis2/ui'
import {Step, StepLabel, Stepper} from "@material-ui/core";
import {findIndex} from "lodash";
import React, {useMemo, useRef, useState} from 'react'
import {useHistory} from "react-router-dom";
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
    const {width, height} = useMediaQuery()
    const history = useHistory();
    const [activeStep, setActiveStep] = useState(steps[0]);
    const formRef = useRef(HTMLFormElement);

    const Component = activeStep.component;

    const onNextStep = () => {
        const index = findIndex(steps, ['label', activeStep.label])
        if (index !== steps.length - 1) {
            setActiveStep(steps[index + 1])
        }
    }
    const onPreviousStep = () => {
        const index = findIndex(steps, ['label', activeStep.label])
        if (index !== 0) {
            setActiveStep(steps[index - 1])
        }
    }
    const onCancel = () => {
        history.replace('/home')
    }

    const hasNextStep = useMemo(() => findIndex(steps, ['label', activeStep.label]) !== (steps.length - 1), [activeStep]);
    const hasPreviousStep = useMemo(() => findIndex(steps, ['label', activeStep.label]) > 0, [activeStep]);

    return (
        <div className='container' >
            <div className='column'>
                <div>
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
                        <div className='container container-bordered background-white center' style={{width: width * .96, minHeight: height*.8}}>
                            <div className='column p-16' style={{height: '100%', justifyContent: 'space-between'}}>
                                {<Component formReference={formRef}/>}
                                <ButtonStrip end>
                                    <Button disabled={!hasPreviousStep}
                                            onClick={onPreviousStep}>Previous</Button>
                                    <Button primary disabled={!hasNextStep}
                                            onClick={onNextStep}>Next</Button>
                                </ButtonStrip>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='row center p-32'>
                    <ButtonStrip center>
                        <Button onClick={onCancel}>Cancel</Button>
                        <Button primary>Save</Button>
                    </ButtonStrip>
                </div>
            </div>
        </div>
    )
}
