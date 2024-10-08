import { Button } from "@dhis2/ui";
import i18n from "@dhis2/d2-i18n";
import { useNavigate, useParams } from "react-router-dom";
import { useScorecardConfigFromServer } from "../../../hooks/data";
import { useMemo } from "react";
import { getUserAuthority, UserState } from "@scorecard/shared";
import { useRecoilValue } from "recoil";
import { getSharingSettingsFromOldConfiguration, ScorecardConfigWithOldSharing } from "../../../../../utils/sharing";

export function ScorecardEditButton() {
	const { id } = useParams();
	const user = useRecoilValue(UserState);
	const navigate = useNavigate();
	const { config } = useScorecardConfigFromServer();

	const access = useMemo(() => {
		if (!config) {
			return {
				read: false,
				write: false
			};
		}
		return getUserAuthority(user, config.sharing ?? getSharingSettingsFromOldConfiguration(config as ScorecardConfigWithOldSharing));
	}, [user, config]);

	const onEditClick = () => {
		navigate(`/edit/${id}`);
	};

	return <Button disabled={!access.write} onClick={onEditClick}>{i18n.t("Edit")}</Button>;
}
