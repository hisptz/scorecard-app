import { Button, ButtonStrip, Modal, ModalActions, ModalContent, ModalTitle } from "@dhis2/ui";
import i18n from "@dhis2/d2-i18n";
import React, { useState } from "react";
import { PeriodSelector } from "@hisptz/dhis2-ui";
import { compact } from "lodash";

export interface CustomPeriodSelectorModalProps {
	hide: boolean;
	onClose: () => void;
	onSelect: (periods: string[]) => void;
	selected?: string[];
}

export function CustomPeriodSelectorModal({
	hide,
	selected,
	onSelect,
	onClose,
}: CustomPeriodSelectorModalProps) {
	const [selectedPeriods, setSelectedPeriods] = useState<string[]>(
		selected ?? [],
	);
	const onUpdate = () => {
		if (selectedPeriods) {
			onSelect(selectedPeriods);
			onClose();
		}
	};

	return (
		<Modal position="middle" hide={hide} onClose={onClose}>
			<ModalTitle>{i18n.t("Select period")}</ModalTitle>
			<ModalContent>
				<div className="column gap-16">
					{!hide && (
						<PeriodSelector
							enablePeriodSelector
							selectedPeriods={compact(selectedPeriods)}
							onSelect={({ items }) => {
								if (Array.isArray(items)) {
									setSelectedPeriods(items as string[]);
								}
							}}
						/>
					)}
				</div>
			</ModalContent>
			<ModalActions>
				<ButtonStrip>
					<Button onClick={onClose}>{i18n.t("Cancel")}</Button>
					<Button primary onClick={onUpdate}>
						{i18n.t("Update")}
					</Button>
				</ButtonStrip>
			</ModalActions>
		</Modal>
	);
}
