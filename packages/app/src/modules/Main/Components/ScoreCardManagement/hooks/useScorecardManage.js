import {useAlert} from "@dhis2/app-runtime";
import i18n from "@dhis2/d2-i18n";
import {useAddScorecard, useUpdateScorecard} from "@scorecard/shared";
import {Scorecard} from "@scorecard/shared";
import {
    IsNewScorecardState,
    RouterState,
    ScorecardConfigEditState,
    ScorecardConfigErrorState,
    ScorecardConfState,
    ScorecardIdState,
    ShouldValidate,
    UserState
} from "@scorecard/shared";
import {uid} from "@scorecard/shared";
import produce from "immer";
import {cloneDeep, findIndex, set} from "lodash";
import {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {useHistory, useParams} from "react-router-dom";
import {useRecoilCallback, useRecoilState, useRecoilValue, useSetRecoilState} from "recoil";
import {ActiveStepIndexState, ActiveStepState, steps} from "../state/pages";


export default function useScorecardManage() {
    const history = useHistory();
    const {id: scorecardId} = useParams();
    const setIsNew = useSetRecoilState(IsNewScorecardState)
    const activeStepIndex = useRecoilValue(ActiveStepIndexState);
    const user = useRecoilValue(UserState);
    const [route, setRoute] = useRecoilState(RouterState);
    const {update} = useUpdateScorecard(scorecardId);
    const scorecardConf = useRecoilValue(ScorecardConfState(scorecardId));
    const [saving, setSaving] = useState(false);
    const [savingAndContinue, setSavingAndContinue] = useState(false);
    const scorecard = cloneDeep(scorecardConf);
    const form = useForm({
        shouldFocusError: true,
        defaultValues: {
            ...scorecard
        },
        reValidateMode: "onChange"
    });

    const setActiveStep = useSetRecoilState(ActiveStepState);

    const {add} = useAddScorecard();
    const {show} = useAlert(
        ({message}) => message,
        ({type}) => ({...type, duration: 3000})
    );

    const resetEditStates = useRecoilCallback(({reset}) => () => {
        reset(ScorecardConfigEditState);
        reset(ScorecardConfigErrorState);
        reset(ShouldValidate);
        reset(IsNewScorecardState);
        reset(ActiveStepState);
    });
    const resetScorecardStates = useRecoilCallback(({reset}) => () => {
        reset(ScorecardConfState(scorecardId));
        reset(ScorecardIdState);
    });

    useEffect(() => {
        return () => {
            resetEditStates();
            resetScorecardStates();
        };
    }, []);

    const onNavigate = () => {
        setRoute((prevRoute) => ({
            ...prevRoute,
            previous: `/edit/${scorecardId}`,
        }));
        history.replace(route?.previous);
    };

    const createNewScorecard = async (updatedScorecard) => {
        await Scorecard.save(updatedScorecard, add, user);
    };

    const updateData = async (updatedScorecard) => {
        await Scorecard.update(updatedScorecard, update);
    };

    const onSave = useRecoilCallback(() => async (updatedScorecard) => {
        setSaving(true);
        try {
            if (scorecardId) {
                await updateData(updatedScorecard);
                show({
                    message: i18n.t("Scorecard updated successfully"),
                    type: {success: true},
                });
            } else {
                const id = uid();
                const updatedData = produce(cloneDeep(updatedScorecard), (draft) => {
                    set(draft, "id", id);
                });
                await createNewScorecard(cloneDeep(updatedData));
                show({
                    message: i18n.t("Scorecard added successfully"),
                    type: {success: true},
                });
            }
            onNavigate();
        } catch (e) {
            console.error(e);
            show({
                message: i18n.t("Scorecard could not be saved" + ": " + e?.message),
                type: {info: true},
            });
        }
        setSaving(false);
    });

    const onSaveAndContinue = useRecoilCallback(() => async (updatedScorecard) => {
        setSavingAndContinue(true);
        try {
            if (scorecardId) {
                await updateData(updatedScorecard);
                setActiveStep(prevStep => {
                    const prevStepIndex = findIndex(steps, {id: prevStep.id});
                    if (prevStepIndex !== steps.length - 1) {
                        return steps[prevStepIndex + 1];
                    }
                });
            } else {
                const id = uid();
                const updatedData = produce(updatedScorecard, (draft) => {
                    set(draft, "id", id);
                });
                await createNewScorecard(updatedData);
                setIsNew({nextStepIndex: activeStepIndex + 1});
                history.replace(`edit/${id}?new=true`);
            }
        } catch (e) {
            console.error(e);
            show({
                message: i18n.t("Scorecard could not be saved" + ": " + e?.message),
                type: {info: true},
            });
        }
        setSavingAndContinue(false);
    });

    return {
        form,
        resetEditStates,
        resetScorecardStates,
        saving,
        onSave,
        onNavigate,
        onSaveAndContinue,
        savingAndContinue
    }
}
