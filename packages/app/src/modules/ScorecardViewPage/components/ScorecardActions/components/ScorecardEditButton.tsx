import { Button } from "@dhis2/ui";
import i18n from "@dhis2/d2-i18n";
import { useNavigate, useParams } from "react-router-dom";
import { useMemo } from "react";
import { useRecoilValue } from "recoil";
import { getSharingSettingsFromOldConfiguration, ScorecardConfigWithOldSharing } from "../../../../../utils/sharing";
import { useConfigContext } from "../../../ConfigProvider";
import { getUserAuthority, UserState } from "../../../../../shared";

export function ScorecardEditButton() {
	const { id } = useParams();
	const user = useRecoilValue(UserState);

	const navigate = useNavigate();
	const config = useConfigContext();

	const access = useMemo(() => {
		if (!config) {
			return {
				read: false,
				write: false
			};
		}
		if (!user) {
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

	return <Button className="scorecard-view-edit-button" disabled={!access.write} onClick={onEditClick}>{i18n.t("Edit")}</Button>;
}
