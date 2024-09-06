import { Tab, TabBar, Tooltip } from "@dhis2/ui";
import { useLocation, useNavigate } from "react-router-dom";
import { getStep, steps } from "../constants/steps";
import { useCallback, useMemo } from "react";


function StepTab({ id }: { id: string }) {
	const navigate = useNavigate();
	const location = useLocation();
	const step = getStep(id);
	const active = useMemo(() => {
		return location.pathname.includes(id);
	}, [location, id]);

	const onStepClick = useCallback(() => {
		navigate(`${id}`);
	}, []);

	return (
		<Tab onClick={onStepClick} selected={active}>
			<Tooltip
				content={step.tooltip}
				key={`${step.id}-step`}
			>
				{step.label}
			</Tooltip>
		</Tab>
	);
}

export function ManagementTabBar() {
	return (
		<TabBar className="w-100" scrollable fixed>
			{steps.map(({ id }) => (
				<StepTab key={`${id}-stepper`} id={id} />
			))}
		</TabBar>
	);
}
