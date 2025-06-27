import React from "react";
import DataSourceConfigurationForm from "../../DataConfiguration/components/DataSourceConfigurationForm";
import { Button, ButtonStrip, Modal, ModalActions, ModalContent, ModalTitle } from "@dhis2/ui";
import i18n from "@dhis2/d2-i18n";
import { Help, INDICATOR_CONFIGURATION_STEPS } from "../../../../../shared";

export default function HighlightedDataSourceConfigurationForm({ index, hide, onClose }: { index: number, hide: boolean; onClose: () => void }) {
	const path = `highlightedIndicators.${index}`;

	return (
		<Modal onClose={onClose} hide={hide} position="middle">
			<ModalTitle>
				{i18n.t("Edit Highlighted Indicator")}
			</ModalTitle>
			<ModalContent>
				<Help helpSteps={INDICATOR_CONFIGURATION_STEPS} />
				<DataSourceConfigurationForm path={path} />
			</ModalContent>
			<ModalActions>
				<ButtonStrip>
					<Button onClick={onClose} primary>
						{i18n.t("Save")}
					</Button>
				</ButtonStrip>
			</ModalActions>
		</Modal>
	);
}
