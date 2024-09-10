import i18n from "@dhis2/d2-i18n";
import { Button, ButtonStrip, Modal, ModalActions, ModalContent, ModalTitle } from "@dhis2/ui";
import { DataSourceSelector, SelectedDataItem } from "@hisptz/dhis2-ui";
import React, { useState } from "react";

export default function DataSourceSelectorModal({
													onClose,
													open,
													onSelect,
													disabled
												}: { onClose: () => void, open: boolean; onSelect: (dataItems: SelectedDataItem[]) => void, disabled: string[] }) {
	const [selectedItems, setSelectedItems] = useState<SelectedDataItem[]>([]);

	return (
		<Modal onClose={onClose} position={"middle"} large hide={!open}>
			<ModalTitle>{i18n.t("Add Data source")}</ModalTitle>
			<ModalContent>
				<div className="w-100">
					<DataSourceSelector
						dataSources={[
							"indicator",
							"dataElement",
							"dataSet",
							"programIndicator",
							"customFunction"
						]}
						selected={selectedItems}
						disabled={disabled}
						onSelect={setSelectedItems}
					/>
				</div>
			</ModalContent>
			<ModalActions>
				<ButtonStrip end>
					<Button onClick={onClose}>{i18n.t("Cancel")}</Button>
					<Button
						dataTest={"scorecard-data-source-add"}
						primary
						onClick={() => {
							onSelect(selectedItems);
							onClose();
						}}
					>
						{i18n.t("Add")}
					</Button>
				</ButtonStrip>
			</ModalActions>
		</Modal>
	);
}
