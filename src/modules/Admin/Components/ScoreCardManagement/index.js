import { useAlert } from "@dhis2/app-runtime";
import i18n from '@dhis2/d2-i18n'
import { Button, ButtonStrip } from "@dhis2/ui";
import { Step, StepLabel, Stepper } from "@material-ui/core";
import { findIndex } from "lodash";
import React, { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from "recoil";
import Scorecard from "../../../../core/models/scorecard";
import ScorecardState, {
  ScorecardEditState,
  ScorecardIdState,
} from "../../../../core/state/scorecard";
import { FullPageLoader } from "../../../../shared/Components/Loaders";
import {
  useAddScorecard,
  useUpdateScorecard,
} from "../../../../shared/hooks/datastore/useScorecard";
import useMediaQuery from "../../../../shared/hooks/useMediaQuery";
import AccessScorecardForm from "./Components/Access";
import DataConfigurationScorecardForm from "./Components/DataConfiguration";
import GeneralScorecardForm from "./Components/General";
import HighlightedIndicatorsScorecardForm from "./Components/HighlightedIndicators";
import OptionsScorecardForm from "./Components/Options";
const steps = [
  {
    label: i18n.t('General'),
    component: GeneralScorecardForm,
  },
  {
    label: i18n.t('Data Configuration'),
    component: DataConfigurationScorecardForm,
  },
  {
    label: i18n.t('Highlighted Indicators'),
    component: HighlightedIndicatorsScorecardForm,
  },
  {
    label: i18n.t('Access'),
    component: AccessScorecardForm,
  },
  {
    label: i18n.t('Options'),
    component: OptionsScorecardForm,
  },
];

export default function ScoreCardManagement() {
  const { id: scorecardId } = useParams();
  const setScorecardIdState = useSetRecoilState(ScorecardIdState);
  const resetScorecardEditState = useResetRecoilState(ScorecardEditState);
  const resetScorecardIdState = useResetRecoilState(ScorecardIdState);
  const scorecardState = useRecoilValue(ScorecardState);
  const { update } = useUpdateScorecard(scorecardId);
  const { add } = useAddScorecard();
  const { show } = useAlert(
    ({ message }) => message,
    ({ type }) => ({ ...type, duration: 3000 })
  );
  const [saving, setSaving] = useState(false);
  const { width, height } = useMediaQuery();
  const history = useHistory();
  const [activeStep, setActiveStep] = useState(steps[0]);
  const formRef = useRef(HTMLFormElement);
  const Component = activeStep.component;
  useEffect(() => {
    setScorecardIdState(scorecardId);
  }, [scorecardId]);

  const reset = () => {
    resetScorecardEditState();
    resetScorecardIdState();
  };

  const onNextStep = () => {
    if (!hasNextStep) {
      onSave();
      return;
    }
    const index = findIndex(steps, ["label", activeStep.label]);
    if (index !== steps.length - 1) {
      setActiveStep(steps[index + 1]);
    }
  };

  const onPreviousStep = () => {
    const index = findIndex(steps, ["label", activeStep.label]);
    if (index !== 0) {
      setActiveStep(steps[index - 1]);
    }
  };

  const onCancel = () => {
    reset();
    history.goBack();
  };

  const onSave = async () => {
    try {
      setSaving(true);
      if (scorecardId) {
        await Scorecard.update(scorecardState, update);
      } else {
        await Scorecard.save(scorecardState, add);
      }
      setSaving(false);
      reset();
      history.goBack();
      show({
        message: i18n.t("Configuration saved Successfully"),
        type: { success: true },
      });
    } catch (e) {
      show({ message: e?.message ?? e.details, type: { info: true } });
      setSaving(false);
    }
  };

  const hasNextStep = useMemo(
    () => findIndex(steps, ["label", activeStep.label]) !== steps.length - 1,
    [activeStep]
  );
  const hasPreviousStep = useMemo(
    () => findIndex(steps, ["label", activeStep.label]) > 0,
    [activeStep]
  );

  return (
    <Suspense fallback={<FullPageLoader />}>
      <div className="container">
        <div className="column">
          <div>
            <Stepper>
              {steps?.map((step) => (
                <Step
                  style={
                    step === activeStep ? { background: "#00695c" } : undefined
                  }
                  active={step === activeStep}
                  onClick={() => setActiveStep(step)}
                  key={`${step.label}-step`}
                >
                  <StepLabel>{step.label}</StepLabel>
                </Step>
              ))}
            </Stepper>
          </div>
          <div className="row">
            <div className="column center" style={{ flex: 1 }}>
              <div
                className="container container-bordered background-white center"
                style={{ width: width * 0.96, minHeight: height * 0.8 }}
              >
                <div className="row" style={{ height: "100%" }}>
                  <div
                    className="column p-16"
                    style={{ height: "100%", justifyContent: "space-between" }}
                  >
                    {<Component formReference={formRef} />}
                    <ButtonStrip end>
                      <Button
                        disabled={!hasPreviousStep}
                        onClick={onPreviousStep}
                      >
                        {i18n.t('Previous')}
                      </Button>
                      <Button primary disabled={saving} onClick={onNextStep}>
                        {!hasNextStep
                          ? saving
                            ? `${i18n.t('Saving')}...`
                            : i18n.t('Save')
                          : i18n.t('Next')}
                      </Button>
                    </ButtonStrip>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row center p-32">
            <ButtonStrip center>
              <Button onClick={onCancel}>{i18n.t('Cancel')}</Button>
              <Button disabled={saving} onClick={onSave} primary>
                {saving ? `${i18n.t('Saving')}...` : i18n.t('Save')}
              </Button>
            </ButtonStrip>
          </div>
        </div>
      </div>
    </Suspense>
  );
}
