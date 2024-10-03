import i18n from "@dhis2/d2-i18n";
import { Button, Card, colors } from "@dhis2/ui";
import React from "react";
import { useNavigate } from "react-router-dom";
// import { ReactComponent as ScorecardIllustration } from "./resources/scorecard_illustration.svg";
import { IconAdd24 } from "@dhis2/ui-icons";

export default function EmptyScoreCardList() {
	const navigate = useNavigate();
	const onNewScorecardClick = () => {
		navigate(`/add`, { state: { from: "home" } });
	};

	return (
		<div
			style={{
				alignItems: "center",
				justifyContent: "center"
			}}
			className="center column align-center"
		>
			<div style={{ minWidth: "50dvw", maxWidth: "80dvw" }}>
				<Card>
					<div
						className="container-bordered text-center center align-items-center column background-white"
						style={{ borderRadius: 8, padding: 32 }}
					>
						<div className="p-32">
							{/*<ScorecardIllustration height={200} width={200} />*/}
						</div>
						<div className="p-8">
							<h1
								style={{ position: "relative" }}
								data-test="welcome-scorcard-title"
							>
								{i18n.t("Welcome to Scorecard App!")}
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
								{i18n.t("New Scorecard")}
							</Button>
						</div>
					</div>
				</Card>
			</div>
		</div>
	);
}
