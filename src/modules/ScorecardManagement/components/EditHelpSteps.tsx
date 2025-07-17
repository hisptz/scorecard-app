import { HelpState, STEP_OPTIONS } from "../../../shared";
import { Steps } from "intro.js-react";
import { useRecoilState } from "recoil";
import { useLocation } from "react-router-dom";
import { useMemo } from "react";
import { steps } from "../constants/steps";

export function EditHelpSteps() {
	const [helpEnabled, setHelpEnabled] = useRecoilState<boolean>(HelpState);
	const location = useLocation();

	const activeTab = useMemo(() => {
		return steps.find((step) => location.pathname.includes(step.id));
	}, [location]);

	const onHelpExit = () => {
		setHelpEnabled(false);
	};

	return (
		<Steps
			options={STEP_OPTIONS}
			enabled={helpEnabled}
			steps={activeTab?.helpSteps ?? []}
			onExit={onHelpExit}
			initialStep={0}
		/>
	);
}
