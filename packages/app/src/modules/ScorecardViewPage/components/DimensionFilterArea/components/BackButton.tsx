import i18n from "@dhis2/d2-i18n";
import { Button } from "@dhis2/ui";
import React from "react";
import { useNavigate } from "react-router-dom";

export function BackButton() {
	const navigate = useNavigate();
	const onBackClick = () => {
		navigate("/");
	};

	return (
		<Button onClick={onBackClick}>
			{i18n.t("Back to all scorecards")}
		</Button>
	);
}
