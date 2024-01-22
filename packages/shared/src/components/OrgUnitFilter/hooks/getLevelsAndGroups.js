import {useRecoilValue} from "recoil";
import {OrgUnitGroups, OrgUnitLevels} from "../../../state";

export default function useOrgUnitLevelsAndGroups() {
    const levels = useRecoilValue(OrgUnitLevels);
    const groups = useRecoilValue(OrgUnitGroups);
    return {
        levels,
        groups,
    };
}
