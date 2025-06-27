import { colors, IconError24 } from "@dhis2/ui";
import PropTypes from "prop-types";
import React from "react";

export default function ErrorIcon({ size, color }: any) {
	return (
		<IconError24
			color={color ?? colors.grey500}
			style={{
				fontSize: size
			}}
		/>
	);
}

ErrorIcon.propTypes = {
	size: PropTypes.number.isRequired,
	color: PropTypes.string
};
