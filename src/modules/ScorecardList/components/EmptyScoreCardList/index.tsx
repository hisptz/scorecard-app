import i18n from "@dhis2/d2-i18n";
import { Button, colors, IconAdd24 } from "@dhis2/ui";
import React from "react";
import { useNavigate } from "react-router-dom";
import illustration from "../../../../assets/images/scorecard_illustration.png";

export default function EmptyScoreCardList() {
	const navigate = useNavigate();
	const onNewScorecardClick = () => {
		navigate(`/add/general`, { state: { from: "home" } });
	};

	return (
		<div
			style={{
				alignItems: "center",
				justifyContent: "center"
			}}
			className="center column align-center"
		>
			<div
				className="text-center center align-items-center flex flex-col"
			>
				<img
					alt="create-new-scorecard"
					src={illustration}
					height={160}
					width={160}
				/>
				<div className="p-8">
					<h1
						data-test="welcome-scorcard-title"
						className="text-2xl font-bold"
					>
						{i18n.t("Welcome to Scorecard!")}
					</h1>
					<p
						style={{
							fontStyle: "italic",
							color: colors.grey700,
							position: "relative"
						}}
					>
						{i18n.t(
							"Create a scorecard instantly, over tea break"
						)}
						...
					</p>
				</div>
				<div className="pt-16">
					<Button
						onClick={onNewScorecardClick}
						dataTest={"new-scorecard-button"}
						primary
						icon={<IconAdd24 />}
					>
						{i18n.t("Create your first scorecard")}
					</Button>
				</div>
			</div>
		</div>
	);
}
