import { colors } from "@dhis2/ui";
import { getUserAuthority, ScorecardCardImage as holderImage, truncateDescription, UserState } from "@scorecard/shared";
import React, { useState } from "react";
import { ScorecardListItem } from "../../types";
import { ScorecardListCardActions } from "./ScorecardListCardActions";
import { getSharingSettingsFromOldConfiguration } from "../../../../utils/sharing";
import { useRecoilValue } from "recoil";
import { useNavigateToScorecardView } from "../../../../hooks/navigate";

export default function ScorecardListCard({
											  scorecard,
											  grid
										  }: {
	scorecard: ScorecardListItem;
	grid?: boolean;
}) {
	const user = useRecoilValue(UserState);
	const { title, description } = scorecard ?? {};
	const [showFullDescription, setShowFullDescription] = useState(false);

	const accessConfig = getUserAuthority(user, scorecard.sharing ?? getSharingSettingsFromOldConfiguration(scorecard as any));
	const { read } = accessConfig;

	const navigateToView = useNavigateToScorecardView();


	const onView = () => {
		if (read) {
			navigateToView(scorecard);
		}
	};

	const styles = { margin: 16, background: "white", opacity: read ? 1 : 0.4, cursor: read ? "pointer" : "not-allowed" };

	return grid ? (
		<div
			className="container-bordered p-16 "
			data-test="scorecard-thumbnail-view"
			style={styles}
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
			style={styles}
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
				<div className="row end">
					<ScorecardListCardActions scorecard={scorecard} />
				</div>
			</div>
		</div>
	);
}
