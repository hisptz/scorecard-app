import { Button } from "@dhis2/ui";
import i18n from "@dhis2/d2-i18n";
import { useNavigate, useParams } from "react-router-dom";

export function ScorecardEditButton() {
	const { id } = useParams();
	const navigate = useNavigate();

	const onEditClick = () => {
		navigate(`/edit/${id}`);
	};

	return <Button onClick={onEditClick}>{i18n.t("Edit")}</Button>;
}
