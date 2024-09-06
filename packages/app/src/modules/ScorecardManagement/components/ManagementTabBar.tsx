import { Tab, TabBar, Tooltip } from "@dhis2/ui";
import { useLocation, useNavigate } from "react-router-dom";
import { getCurrentStepId, getStep, steps } from "../constants/steps";
import { useCallback, useMemo } from "react";
import { useFormContext } from "react-hook-form";
import { useAlert } from "@dhis2/app-runtime";
import i18n from "@dhis2/d2-i18n";


function StepTab({ id }: { id: string }) {
	const { trigger } = useFormContext();
	const { show } = useAlert(({ message }) => message, ({ type }) => ({ ...type, duration: 3000 }));
	const navigate = useNavigate();
	const location = useLocation();
	const step = getStep(id);
	const active = useMemo(() => {
		return location.pathname.includes(id);
	}, [location, id]);

	const onStepClick = useCallback(async () => {
		const currentStep = getStep(getCurrentStepId(location));
		if (await trigger(currentStep.fieldIds)) {
			navigate(`${id}`);
		} else {
			show({ message: i18n.t("You need to fix issues on this step before moving to another step"), type: { info: true } });
		}
	}, [location]);

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
