import i18n from "@dhis2/d2-i18n";
import { Button, ButtonStrip, colors, MenuItem } from "@dhis2/ui";
import { IconDelete24, IconEdit24 } from "@dhis2/ui-icons";
import { cloneDeep, set } from "lodash";
import PropTypes from "prop-types";
import React, { useState } from "react";
import { getAccessIcon, getAccessName } from "../../../utils";
import SharingMenu from "./SharingMenu";
import { ScorecardAccess } from "../../../../../../../../../shared";

export default function SingleSharingComponent({
	access,
	onDelete,
	onAccessChange,
}: any) {
	const { access: selectedAccess, type, displayName } = access;
	const [ref, setRef] = useState();

	const onChange = (newAccess: any) => {
		const updatedAccess = cloneDeep(access);
		set(updatedAccess, ["access"], newAccess);
		onAccessChange(updatedAccess);
		setRef(undefined);
	};

	return (
		<MenuItem
			icon={getAccessIcon(type)}
			label={
				<div className="row space-between align-items-center">
					<div className="column">
						<p style={{ margin: 2, fontSize: 16 }}>{displayName}</p>
						<p
							style={{
								color: colors.grey700,
								fontSize: 14,
								margin: 0,
							}}
						>
							{getAccessName(selectedAccess)}
						</p>
					</div>
					<div className="column align-items-end">
						<ButtonStrip className="edit-delete-access">
							<Button
								onClick={(_: any, e: any) =>
									setRef(e.currentTarget)
								}
								icon={<IconEdit24 />}
							>
								{i18n.t("Edit")}
							</Button>
							{Boolean(onDelete) && (
								<Button
									onClick={() => {
										onDelete(access);
									}}
									icon={<IconDelete24 />}
								>
									{i18n.t("Delete")}
								</Button>
							)}
						</ButtonStrip>
					</div>
					{ref && (
						<SharingMenu
							reference={ref}
							onClose={() => setRef(undefined)}
							selectedAccess={selectedAccess}
							onAccessChange={onChange}
						/>
					)}
				</div>
			}
		/>
	);
}

SingleSharingComponent.propTypes = {
	access: PropTypes.instanceOf(ScorecardAccess).isRequired,
	onAccessChange: PropTypes.func.isRequired,
	onDelete: PropTypes.func,
};
