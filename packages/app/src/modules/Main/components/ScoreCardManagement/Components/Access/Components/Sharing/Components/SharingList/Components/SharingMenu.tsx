import { FlyoutMenu, Layer, MenuItem, Popper } from "@dhis2/ui";
import { ACCESS_TYPES } from "@scorecard/shared";
import { IconCheckmark24 } from "@dhis2/ui-icons";
import PropTypes from "prop-types";
import React, { Fragment } from "react";
import { getAccessName } from "../../../utils";

export default function SharingMenu({
	reference,
	onClose,
	selectedAccess,
	onAccessChange,
}: any) {
	return (
		<Layer onClick={onClose}>
			<Popper reference={reference} placement="bottom-start">
				<FlyoutMenu>
					{ACCESS_TYPES?.map((accessType: any) => (
						<Fragment key={accessType}>
							<MenuItem
								onClick={() => onAccessChange(accessType)}
								active={selectedAccess === accessType}
								label={getAccessName(accessType)}
								icon={
									selectedAccess === accessType && (
										<IconCheckmark24 />
									)
								}
							/>
						</Fragment>
					))}
				</FlyoutMenu>
			</Popper>
		</Layer>
	);
}

SharingMenu.propTypes = {
	reference: PropTypes.object.isRequired,
	selectedAccess: PropTypes.string.isRequired,
	onAccessChange: PropTypes.func.isRequired,
	onClose: PropTypes.func.isRequired,
};
