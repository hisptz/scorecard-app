import { colors } from "@dhis2/ui";
import { getOrgUnitIdsFromOrgUnitSelection, ScorecardCardImage as holderImage, truncateDescription } from "@scorecard/shared";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ScorecardListItem } from "../../types";
import { ScorecardListCardActions } from "./ScorecardListCardActions";
import { OrgUnitSelection } from "@hisptz/dhis2-utils";

export default function ScorecardListCard({
											  scorecard,
											  grid
										  }: {
	scorecard: ScorecardListItem;
	grid: boolean;
}) {
	const { title, description, id, orgUnitSelection, periodSelection } = scorecard ?? {};
	const [showFullDescription, setShowFullDescription] = useState(false);
	const navigate = useNavigate();

	const onView = () => {
		const orgUnitIds = getOrgUnitIdsFromOrgUnitSelection(orgUnitSelection as OrgUnitSelection).join(";");
		const periodIds = periodSelection.periods.map(({ id }) => id).join(";");
		navigate(`/view/${id}?ou=${orgUnitIds}&pe=${periodIds}`);
	};

	return grid ? (
		<div
			className="container-bordered p-16 "
			data-test="scorecard-thumbnail-view"
			style={{ margin: 16, background: "white" }}
			onClick={onView}
		>
			<div className="column space-between h-100">
				<div className="text-center p-8">
					<img
						alt="img"
						src={holderImage}
						style={{ height: 100, width: 200 }}
					/>
				</div>
				<div className="flex-1 column align-items-center">
					<h4 className="scorecard-list-card-title">{title}</h4>
					<p
						className="scorecard-list-card-description"
						style={{ color: colors.grey700 }}
					>
						{(description?.length ?? 0) > 100 ? (
							<div
								onClick={(event) => {
									event.stopPropagation();
									setShowFullDescription(
										(prevState) => !prevState
									);
								}}
								className="row space-between align-content-end"
							>
								{showFullDescription
									? description
									: truncateDescription(description)}
							</div>
						) : (
							description
						)}
					</p>
				</div>
				<div style={{ margin: "0 8px" }}>
					<ScorecardListCardActions scorecard={scorecard} />
				</div>
			</div>
		</div>
	) : (
		<div
			data-test="scorecard-thumbnail-view"
			className="container-bordered p-32"
			style={{ margin: 16, background: "white" }}
			onClick={onView}
		>
			<div className="row space-between align-items-center">
				<div className="row align-items-center">
					<div>
						<img
							alt="img"
							src={holderImage}
							style={{ height: 100, width: 200 }}
						/>
					</div>
					<div className="column start">
						<h4 className="scorecard-list-card-title">{title}</h4>
						<p
							className="scorecard-list-card-description"
							style={{ color: colors.grey700 }}
						>
							{(description?.length ?? 0) > 100 ? (
								<div
									onClick={(event) => {
										event.stopPropagation();
										setShowFullDescription(
											(prevState) => !prevState
										);
									}}
									className="row space-between align-content-end"
								>
									{showFullDescription
										? description
										: truncateDescription(description)}
								</div>
							) : (
								description
							)}
						</p>
					</div>
				</div>
				<div className="row end"></div>
			</div>
		</div>
	);
}