import { useSetRecoilState } from "recoil";
import { ScorecardForceUpdateState } from "../state";

export default function useForceUpdate(scorecardId: any) {
	const setForceUpdateState = useSetRecoilState(
		ScorecardForceUpdateState(scorecardId),
	);
	const forceUpdate = () => {
		setForceUpdateState((prevState) => prevState + 1);
	};
	return {
		forceUpdate,
	};
}