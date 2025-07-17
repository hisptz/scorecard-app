import { colors } from "@dhis2/ui";
import {
	ScorecardCardImage as holderImage,
	truncateDescription,
} from "../../../../shared";
import { useState } from "react";
import { ScorecardListItem } from "../../types";
import { ScorecardListCardActions } from "./ScorecardListCardActions";
import { useNavigateToScorecardView } from "../../../../hooks/navigate";

export default function ScorecardListCard({
	scorecard,
	grid,
	refetch,
}: {
	scorecard: ScorecardListItem;
	grid?: boolean;
	refetch: () => void;
}) {
	const { title, description } = scorecard ?? {};
	const [showFullDescription, setShowFullDescription] = useState(false);

	const { read } = { read: true };

	const navigateToView = useNavigateToScorecardView();

	const onView = () => {
		if (read) {
			navigateToView(scorecard);
		}
	};

	const styles = {
		margin: 8,
		background: "white",
		opacity: read ? 1 : 0.4,
		cursor: read ? "pointer" : "not-allowed",
	};

	return grid ? (
		<div
			className="container-bordered p-8 hover:border-blue-950"
			data-test="scorecard-thumbnail-view"
			style={styles}
			onClick={onView}
			role="button"
		>
			<div
				style={{ gap: 8 }}
				className="flex flex-col space-between h-100"
			>
				<div className="p-8 m-auto">
					<img
						alt="img"
						src={holderImage}
						style={{ height: 60, width: 120 }}
					/>
				</div>
				<div className="flex-1 flex flex-col items-center">
					<h5
						style={{ margin: 0 }}
						className="scorecard-list-card-title"
					>
						{title}
					</h5>
					<p
						className="scorecard-list-card-description"
						style={{
							color: colors.grey700,
							fontSize: 12,
							margin: 4,
							lineHeight: 1.2,
						}}
					>
						{(description?.length ?? 0) > 100 ? (
							<div
								onClick={(event) => {
									event.stopPropagation();
									setShowFullDescription(
										(prevState) => !prevState
									);
								}}
								className="flex space-between align-content-end"
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
					<ScorecardListCardActions
						refetch={refetch}
						scorecard={scorecard}
					/>
				</div>
			</div>
		</div>
	) : (
		<div
			data-test="scorecard-thumbnail-view"
			className="container-bordered p-16"
			style={styles}
			onClick={onView}
		>
			<div className="flex space-between align-items-center">
				<div style={{ gap: 16 }} className="flex align-items-center">
					<div>
						<img
							alt="img"
							src={holderImage}
							style={{ height: 80, width: 160 }}
						/>
					</div>
					<div className="flex flex-col justify-start">
						<h4 className="scorecard-list-card-title">{title}</h4>
						<p
							className="scorecard-list-card-description"
							style={{
								color: colors.grey700,
								fontSize: 12,
								margin: 4,
								lineHeight: 2,
							}}
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
				<div className="flex justify-end">
					<ScorecardListCardActions
						refetch={refetch}
						scorecard={scorecard}
					/>
				</div>
			</div>
		</div>
	);
}
