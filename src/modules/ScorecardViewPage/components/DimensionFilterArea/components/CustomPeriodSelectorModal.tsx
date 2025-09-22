import { Button, ButtonStrip, Modal, ModalActions, ModalContent, ModalTitle } from "@dhis2/ui";
import i18n from "@dhis2/d2-i18n";
import React, { useMemo, useState, useTransition } from "react";
import { PeriodSelector } from "@hisptz/dhis2-ui";
import { compact, isEmpty, uniqBy } from "lodash";
import { PeriodTypeCategory, PeriodUtility } from "@hisptz/dhis2-utils";
import { useConfigContext } from "../../../ConfigProvider";

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
											  onClose
										  }: CustomPeriodSelectorModalProps) {
	const config = useConfigContext();
	const [isPending, startTransition] = useTransition();
	const [selectedPeriods, setSelectedPeriods] = useState<string[]>(
		selected ?? []
	);
	const onUpdate = () => {
		if (selectedPeriods) {
			startTransition(() => {
				onSelect(selectedPeriods);
				onClose();
			});
		}
	};

	const filteredPeriodTypes = useMemo(() => {
		const periodTypeId = config?.periodSelection.type?.toUpperCase();
		if (!periodTypeId) {
			return [];
		}
		return uniqBy([
			...new PeriodUtility().setCategory(PeriodTypeCategory.FIXED).periodTypes,
			...new PeriodUtility().setCategory(PeriodTypeCategory.RELATIVE).periodTypes
		], "id").filter((periodType) => periodType.id != periodTypeId).map((periodType) => periodType.id);
	}, [config]);

	const periodType = useMemo(() => {
		if (!config?.periodSelection.type) {
			return null;
		}
		return [
			...new PeriodUtility().setCategory(PeriodTypeCategory.FIXED).periodTypes,
			...new PeriodUtility().setCategory(PeriodTypeCategory.RELATIVE).periodTypes
		].find((periodType) => periodType.id == config?.periodSelection.type);
	}, [config]);

	if (hide) {
		return null;
	}

	return (
		<Modal position="middle" hide={hide} onClose={onClose}>
			<ModalTitle>{i18n.t("Select period")}</ModalTitle>
			<ModalContent>
				<div className="column gap-16">
					{
						periodType && (
							<span>{i18n.t("Selection is limited to period of type")}: <b>{periodType?.config.name}</b></span>)
					}
					<PeriodSelector
						enablePeriodSelector
						excludedPeriodTypes={isEmpty(filteredPeriodTypes) ? undefined : filteredPeriodTypes}
						selectedPeriods={compact(selectedPeriods)}
						onSelect={({ items }) => {
							if (Array.isArray(items)) {
								setSelectedPeriods(items as string[]);
							}
						}}
					/>
				</div>
			</ModalContent>
			<ModalActions>
				<ButtonStrip>
					<Button onClick={onClose}>{i18n.t("Cancel")}</Button>
					<Button loading={isPending} primary onClick={onUpdate}>
						{isPending ? i18n.t("Updating...") : i18n.t("Update")}
					</Button>
				</ButtonStrip>
			</ModalActions>
		</Modal>
	);
}
