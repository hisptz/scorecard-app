import i18n from "@dhis2/d2-i18n";

export const onView = (history, readAccess, id) => () => {
  if (readAccess) {
    history.push(`/view/${id}`);
  }
};

export const onEdit = (history, writeAccess, id) => () => {
  if (writeAccess) {
    history.push(`/edit/${id}`);
  }
};

export const onDelete =
  ({ deleteAccess, remove, show, setDeleteConfirmOpen }) =>
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
