import {useRecoilValue} from "recoil";
import HelpState from "../../../../../../../core/state/help";


export default function useHelp() {
    const helpEnabled = useRecoilValue(HelpState)

    return {
        helpEnabled
    }
}
