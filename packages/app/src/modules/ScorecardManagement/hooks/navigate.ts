import { useLocation } from "react-router-dom";
import { getAdjacentSteps, getStep } from "../constants/steps";


export default function useScorecardManagerNavigate() {
	const location = useLocation();
	const activeStepId = location.pathname.split("/").pop();
	const { next, previous } = getAdjacentSteps(activeStepId!);
	const currentStep = getStep(activeStepId!);

	return {
		hasNext: !!next,
		hasPrevious: !!previous,
		currentStep,
		next,
		previous
	};
}
