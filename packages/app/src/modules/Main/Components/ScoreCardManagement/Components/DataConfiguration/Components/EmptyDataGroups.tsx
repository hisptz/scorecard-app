import i18n from "@dhis2/d2-i18n";
import { Button } from "@dhis2/ui";
import { IconAdd24 } from "@dhis2/ui-icons";
import PropTypes from "prop-types";
import React from "react";

export default function EmptyDataGroups({ onGroupAdd }: any) {
	return (
		<div style={{ margin: "auto" }}>
			<Button
				onClick={onGroupAdd}
				icon={<IconAdd24 />}
				className="scorecard-add-group-button"
				dataTest="scorecard-add-group-button"
			>
				{i18n.t("Add Group")}
			</Button>
		</div>
	);
}

EmptyDataGroups.propTypes = {
	onGroupAdd: PropTypes.func.isRequired,
};
