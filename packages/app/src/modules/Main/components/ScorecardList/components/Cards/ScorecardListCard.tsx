import i18n from "@dhis2/d2-i18n";
import { Button, ButtonStrip, colors } from "@dhis2/ui";
import {
	ScorecardCardImage as holderImage,
	truncateDescription,
	UserAuthorityOnScorecard,
} from "@scorecard/shared";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { ScorecardListItem } from "../../types";

export default function ScorecardListCard({
	scorecard,
	grid,
}: {
	scorecard: ScorecardListItem;
	grid: boolean;
}) {
	const { write, delete: deletePermission } = useRecoilValue(
		UserAuthorityOnScorecard(scorecard?.id),
	);
	const { title, description, id } = scorecard ?? {};
	const [showFullDescription, setShowFullDescription] = useState(false);
	const navigate = useNavigate();

	const onView = () => {
		navigate(`/view/${id}`);
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
										(prevState) => !prevState,
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
					<ButtonStrip middle>
						<Button onClick={onView}>{i18n.t("View")}</Button>
						{write && (
							<Button
								dataTest={"edit-scorecard-button"}
								onClick={function (_: any, e: any) {
									e.stopPropagation();
									onEdit();
								}}
							>
								{i18n.t("Edit")}
							</Button>
						)}
						{deletePermission && (
							<Button
								dataTest="scorecard-delete-button"
								onClick={onDelete}
							>
								{i18n.t("Delete")}
							</Button>
						)}
					</ButtonStrip>
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
											(prevState) => !prevState,
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
