import { Button, ButtonStrip } from "@dhis2/ui";
import i18n from "@dhis2/d2-i18n";
import React from "react";
import { ScorecardListItem } from "../../types";
import { getUserAuthority, useDeleteScorecard, UserState } from "@scorecard/shared";
import { useAlert } from "@dhis2/app-runtime";
import { useDialog } from "@hisptz/dhis2-ui";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { getSharingSettingsFromOldConfiguration } from "../../../../utils/sharing";
import { useNavigateToScorecardView } from "../../../../hooks/navigate";

export interface ScorecardListCardActionsProps {
	scorecard: ScorecardListItem;
}

export function ScorecardListCardActions({
											 scorecard
										 }: ScorecardListCardActionsProps) {
	const user = useRecoilValue(UserState);
	const navigate = useNavigate();

	const navigateToView = useNavigateToScorecardView();


	const { confirm } = useDialog();

	const { show } = useAlert(
		({ message }) => message,
		({ type }) => ({ ...type, duration: 3000 })
	);
	const { remove } = useDeleteScorecard(scorecard.id);

	const onView = () => {
		navigateToView(scorecard);
	};

	const accessConfig = getUserAuthority(user, scorecard.sharing ?? getSharingSettingsFromOldConfiguration(scorecard as any));

	const { read, write } = accessConfig;

	const deleteScorecard = async () => {
		if (write) {
			try {
				await remove();
			} catch (e: any) {
				show({
					message: e.message,
					type: { info: true }
				});
			}
			show({
				message: i18n.t("Scorecard deleted successfully"),
				type: { success: true }
			});
		}
	};
	const onEdit = () => {
		if (write) {
			navigate(`/edit/${scorecard.id}`);
		}
	};
	const onDelete = (value: any, event: any) => {
		event.stopPropagation();
		confirm({
			title: i18n.t("Confirm scorecard delete"),
			message: (
				<p>
					{i18n.t("Are you sure you want to delete scorecard ")}:
					<b>{scorecard.title}</b>
				</p>
			),
			onCancel: () => {
			},
			onConfirm: async () => {
				await deleteScorecard();
			}
		});
	};

	return (
		<ButtonStrip middle>
			{read && <Button onClick={onView}>{i18n.t("View")}</Button>}
			{write && (
				<Button
					dataTest={"edit-scorecard-button"}
					onClick={function(_: any, e: any) {
						e.stopPropagation();
						onEdit();
					}}
				>
					{i18n.t("Edit")}
				</Button>
			)}
			{write && (
				<Button dataTest="scorecard-delete-button" onClick={onDelete}>
					{i18n.t("Delete")}
				</Button>
			)}
		</ButtonStrip>
	);
}
