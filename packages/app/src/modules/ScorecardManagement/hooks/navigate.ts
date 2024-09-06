import { useLocation } from "react-router-dom";
import { getAdjacentSteps } from "../constants/steps";


export default function useScorecardManagerNavigate() {
	const location = useLocation();
	const activeStepId = location.pathname.split("/").pop();
	const { next, previous } = getAdjacentSteps(activeStepId!);

	return {
		hasNext: !!next,
		hasPrevious: !!previous,
		next,
		previous
	};
}
