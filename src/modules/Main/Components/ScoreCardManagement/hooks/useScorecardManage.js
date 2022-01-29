import {useAlert} from "@dhis2/app-runtime";
import i18n from "@dhis2/d2-i18n";
import {useState} from "react";
import {useForm} from "react-hook-form";
import {useHistory, useParams} from "react-router-dom";
import {useRecoilCallback, useRecoilState, useRecoilValue} from "recoil";
import Scorecard from "../../../../../core/models/scorecard";
import RouterState from "../../../../../core/state/router";
import ScorecardConfState, {
    ScorecardConfigEditState,
    ScorecardConfigErrorState,
    ScorecardIdState
} from "../../../../../core/state/scorecard";
import {UserState} from "../../../../../core/state/user";
import {ShouldValidate} from "../../../../../core/state/validators";
import {useAddScorecard, useUpdateScorecard} from "../../../../../shared/hooks/datastore/useScorecard";


export default function useScorecardManage() {
    const history = useHistory();
    const {id: scorecardId} = useParams();
    const user = useRecoilValue(UserState);
    const [route, setRoute] = useRecoilState(RouterState);
    const {update} = useUpdateScorecard(scorecardId);
    const scorecardConf = useRecoilValue(ScorecardConfState(scorecardId))

    const {add} = useAddScorecard();
    const {show} = useAlert(
        ({message}) => message,
        ({type}) => ({...type, duration: 3000})
    );
    const [saving, setSaving] = useState(false);

    const form = useForm({
        defaultValues: {...scorecardConf}
    });
    const resetEditStates = useRecoilCallback(({reset}) => () => {
        reset(ScorecardConfigEditState);
        reset(ScorecardConfigErrorState);
        reset(ShouldValidate);
    });
    const resetScorecardStates = useRecoilCallback(({reset}) => () => {
        reset(ScorecardConfState(scorecardId));
        reset(ScorecardIdState);
    });

    const onNavigate = () => {
        setRoute((prevRoute) => ({
            ...prevRoute,
            previous: `/edit/${scorecardId}`,
        }));
        history.replace(route?.previous);
    };

    const createNewScorecard = async (updatedScorecard) => {
        await Scorecard.save(updatedScorecard, add, user);
        show({
            message: i18n.t("Scorecard added successfully"),
            type: {success: true},
        });
    };

    const updateData = async (updatedScorecard) => {
        await Scorecard.update(updatedScorecard, update);
        show({
            message: i18n.t("Scorecard updated successfully"),
            type: {success: true},
        });

    };

    const onSave = useRecoilCallback(() => async (updatedScorecard) => {
        setSaving(true);
        try {
            if (scorecardId) {
                await updateData(updatedScorecard);
            } else {
                await createNewScorecard(updatedScorecard);
            }
            onNavigate();
        } catch (e) {
            console.error(e);
        }
        setSaving(false);
    });

    return {
        form,
        resetEditStates,
        resetScorecardStates,
        saving,
        onSave,
        onNavigate
    }
}
