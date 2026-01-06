import i18n from "@dhis2/d2-i18n";
// @ts-expect-error missing types - centered content
import { Button, CenteredContent, colors, IconError24 } from "@dhis2/ui";
import React from "react";
import { useNavigate } from "react-router-dom";

export default function AccessDeniedPage({ accessType }: { accessType: "edit" | "view" }) {
	const navigate = useNavigate();

	const onHomeClick = () => {
		navigate("/", { replace: true });
	};

	return (
		<div className="column center align-items-center w-100 h-100">
			<CenteredContent>
				<div className="column align-items-center">
					<IconError24
						color={colors.grey700}
						/* @ts-expect-error prop errors */
						style={{ fontSize: 64 }}
						fontSize="large"
					/>
					<p
						style={{
							color: colors.grey700,
							fontWeight: "bold",
							fontSize: "1vw"
						}}
					>
						{i18n.t("You do not have access to {{accessType}} this Scorecard", {
							accessType
						})}
					</p>
					<Button primary onClick={onHomeClick}>
						{i18n.t("Back to scorecard list")}
					</Button>
				</div>
			</CenteredContent>
		</div>
	);
}