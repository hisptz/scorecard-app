import { useAlert } from "@dhis2/app-runtime";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { UserAuthorityOnScorecard } from "../../../../../../../core/state/user";
import { useDeleteScorecard } from "../../../../../../../shared/hooks/datastore/useScorecard";

export default function useCardDetails(scorecard) {
  const { title, description, id } = scorecard;
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const history = useHistory();
  const { remove, error: deleteError } = useDeleteScorecard(id);
  const {
    write: writeAccess,
    read: readAccess,
    delete: deleteAccess,
  } = useRecoilValue(UserAuthorityOnScorecard(id));
  const { show } = useAlert(
    ({ message }) => message,
    ({ type }) => ({ ...type, duration: 3000 })
  );

  useEffect(() => {
    if (deleteError) {
      show({
        message: deleteError?.message ?? deleteError.toString(),
        type: { info: true },
      });
    }
  }, [deleteError]);

  return {
    readAccess,
    writeAccess,
    deleteAccess,
    show,
    remove,
    deleteConfirmOpen,
    title,
    description,
    setDeleteConfirmOpen,
    history,
    id,
  };
}
