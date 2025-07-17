import { Button } from "@dhis2/ui";
import i18n from "@dhis2/d2-i18n";
import { useNavigate, useParams } from "react-router-dom";
import { useConfigContext } from "../../../ConfigProvider";

export function ScorecardEditButton() {
	const { id } = useParams();

	const navigate = useNavigate();
	const config = useConfigContext();

	const onEditClick = () => {
		navigate(`/edit/${id}`);
	};

	return (
		<Button
			className="scorecard-view-edit-button"
			disabled={!config.access.write}
			onClick={onEditClick}
		>
			{i18n.t("Edit")}
		</Button>
	);
}
