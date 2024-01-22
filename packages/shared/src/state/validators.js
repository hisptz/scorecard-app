//Validation Selectors
import i18n from "@dhis2/d2-i18n";
import {isEmpty} from "lodash";
import {atom, selector, selectorFamily, waitForAll} from "recoil";
import {ScorecardConfigDirtyState} from "./scorecard";
import {REQUIRED_FIELDS} from "../constants";
import {validateGroups} from "../utils";

const ShouldValidate = atom({
    key: "should-validate-state",
    default: false,
});

const FieldErrorState = selectorFamily({
    key: "text-fields-error-state",
    get:
        ({id, validations}) =>
            ({get}) => {
                const shouldValidate = get(ShouldValidate);
                if (shouldValidate) {
                    const value = get(ScorecardConfigDirtyState(id));
                    if (validations?.mandatory) {
                        if (isEmpty(value)) {
                            return i18n.t("This field is required");
                        }
                    }
                }
            },
});

const ErrorState = selector({
    key: "scorecard-error-state",
    get: ({getCallback}) => {
        return getCallback(({snapshot}) => () => {
            return snapshot.getLoadable(
                waitForAll([
                    ...REQUIRED_FIELDS?.map((key) =>
                        FieldErrorState({
                            id: key,
                            validations: {mandatory: true},
                        })
                    ),
                    DataGroupsErrorState,
                ])
            ).contents;
        });
    },
});

const DataGroupsErrorState = selector({
    key: "data-groups-error-state",
    get: ({get}) => {
        const shouldValidate = get(ShouldValidate);
        if (shouldValidate) {
            const dataGroups = get(
                ScorecardConfigDirtyState("dataSelection")
            )?.dataGroups;
            return validateGroups(dataGroups) || null;
        }
    },
});

const DataGroupErrorState = selectorFamily({
    key: "data-groups-validator",
    get:
        (groupId) =>
            ({get}) => {
                const error = get(DataGroupsErrorState);
                return error?.[groupId];
            },
});

export {DataGroupErrorState, ShouldValidate, FieldErrorState, ErrorState};
