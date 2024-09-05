import { useAlert } from "@dhis2/app-runtime";
import { useDeleteScorecard, UserAuthorityOnScorecard } from "@scorecard/shared";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";

export default function useCardDetails(scorecard: any) {
	const { title, description, id } = scorecard;
	const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
	const { remove, error: deleteError } = useDeleteScorecard(id);
	const {
		write: writeAccess,
		read: readAccess,
		delete: deleteAccess,
	}: any = useRecoilValue(UserAuthorityOnScorecard(id));
	const { show } = useAlert(
		({ message }) => message,
		({ type }) => ({ ...type, duration: 3000 }),
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
