import {
	Button,
	ButtonEventHandler,
	ButtonStrip,
	CircularLoader,
} from "@dhis2/ui";
import i18n from "@dhis2/d2-i18n";
import { ScorecardListItem } from "../../types";
import { useDeleteScorecard } from "../../../../shared";
import { useAlert } from "@dhis2/app-runtime";
import { useDialog } from "@hisptz/dhis2-ui";
import { useNavigate } from "react-router-dom";
import { useNavigateToScorecardView } from "../../../../hooks/navigate";
import { useScorecardSharingSettings } from "../../hooks/authority";

export interface ScorecardListCardActionsProps {
	scorecard: ScorecardListItem;
	refetch: () => void;
}

export function ScorecardListCardActions({
	scorecard,
	refetch,
}: ScorecardListCardActionsProps) {
	const navigate = useNavigate();
	const navigateToView = useNavigateToScorecardView();
	const { access, loading } = useScorecardSharingSettings({
		id: scorecard.id,
	});

	const { confirm } = useDialog();

	const { show } = useAlert(
		({ message }) => message,
		({ type }) => ({ ...type, duration: 3000 })
	);
	const { remove } = useDeleteScorecard(scorecard.id);

	const onView = () => {
		navigateToView(scorecard);
	};

	const { read, write, delete: canDelete } = access;

	const deleteScorecard = async () => {
		if (write) {
			try {
				await remove();
				show({
					message: i18n.t("Scorecard deleted successfully"),
					type: { success: true },
				});
			} catch (e) {
				if (e instanceof Error) {
					show({
						message: e.message,
						type: { info: true },
					});
				}
			}
		}
	};
	const onEdit = () => {
		if (write) {
			navigate(`/edit/${scorecard.id}`);
		}
	};
	const onDelete: ButtonEventHandler<
		React.MouseEvent<HTMLButtonElement, MouseEvent>
	> = (_, event) => {
		event.stopPropagation();
		confirm({
			title: i18n.t("Confirm scorecard delete"),
			loadingText: i18n.t("Deleting..."),
			message: (
				<p>
					{i18n.t("Are you sure you want to delete scorecard ")}:
					<b>{scorecard.title}</b>
				</p>
			),
			onCancel: () => {},
			onConfirm: async () => {
				await deleteScorecard();
				refetch();
			},
		});
	};

	if (loading) {
		return (
			<div className="w-full h-[24px] flex display-flex align-items-center center">
				<CircularLoader extrasmall />
			</div>
		);
	}

	return (
		<ButtonStrip middle>
			{read && <Button onClick={onView}>{i18n.t("View")}</Button>}
			{write && (
				<Button
					loading={loading}
					dataTest={"edit-scorecard-button"}
					onClick={function (_, e) {
						e.stopPropagation();
						onEdit();
					}}
				>
					{i18n.t("Edit")}
				</Button>
			)}
			{canDelete && (
				<Button dataTest="scorecard-delete-button" onClick={onDelete}>
					{i18n.t("Delete")}
				</Button>
			)}
		</ButtonStrip>
	);
}
