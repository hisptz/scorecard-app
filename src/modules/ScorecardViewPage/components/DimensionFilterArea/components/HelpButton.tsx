import React from "react";
import { Button, IconQuestion24 } from "@dhis2/ui";
import i18n from "@dhis2/d2-i18n";
import { useBoolean } from "usehooks-ts";
import { Steps } from "intro.js-react";
import { STEP_OPTIONS } from "../../../../../shared";

export interface HelpButtonProps {
	steps: any[];
}

export function HelpButton({ steps }: HelpButtonProps) {
	const { value: hide, setTrue: onHide, setFalse: onShow } = useBoolean(true);

	return (
		<>
			<Steps
				enabled={!hide}
				options={STEP_OPTIONS}
				initialStep={0}
				steps={steps}
				onExit={onHide}
			/>
			<Button onClick={onShow} icon={<IconQuestion24 />}>
				{i18n.t("Help")}
			</Button>
		</>
	);
}
