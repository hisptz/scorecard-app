import i18n from "@dhis2/d2-i18n";

export const onView = (history: any, readAccess: any, id: any) => () => {
	if (readAccess) {
		history.push(`/view/${id}`);
	}
};

export const onEdit = (history: any, writeAccess: any, id: any) => () => {
	if (writeAccess) {
		history.push(`/edit/${id}`);
	}
};

export const onDelete =
	({ deleteAccess, remove, show, setDeleteConfirmOpen }: any) =>
	async () => {
		if (deleteAccess) {
			try {
				await remove();
			} catch (e) {
				show({
					message: e.message,
					type: { info: true },
				});
			}
			setDeleteConfirmOpen(false);
			show({
				message: i18n.t("Scorecard deleted successfully"),
				type: { success: true },
			});
		}
	};
