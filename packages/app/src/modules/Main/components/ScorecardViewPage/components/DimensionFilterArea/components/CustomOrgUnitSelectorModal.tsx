import {
	Button,
	ButtonStrip,
	Modal,
	ModalActions,
	ModalContent,
	ModalTitle,
} from "@dhis2/ui";
import i18n from "@dhis2/d2-i18n";
import React, { useMemo, useState } from "react";
import { OrgUnitSelector } from "@hisptz/dhis2-ui";
import { compact } from "lodash";
import { DimensionSelection } from "./DimensionSelection";
import { useBoolean } from "usehooks-ts";
import { useDimensions } from "../../../hooks/dimensions";
import { useOrgUnits } from "../../../hooks/orgUnit";
import { OrgUnitSelection } from "@hisptz/dhis2-utils";
import {
	getSelectedOrgUnitSelectionDisplay,
	useOrganisationUnitLevelsAndGroups,
} from "@scorecard/shared";

export interface CustomOrgUnitSelectorModalProps {
	hide: boolean;
	onClose: () => void;
	onSelect: (orgUnitSelection: OrgUnitSelection) => void;
	selected?: OrgUnitSelection;
}

export function CustomOrgUnitSelectorModal({
	hide,
	selected,
	onSelect,
	onClose,
}: CustomOrgUnitSelectorModalProps) {
	const [selectedOrgUnits, setSelectedOrgUnits] = useState<OrgUnitSelection>(
		selected ?? { orgUnits: [] },
	);

	const onUpdate = () => {
		if (selectedOrgUnits) {
			onSelect(selectedOrgUnits);
			onClose();
		}
	};

	return (
		<Modal position="middle" hide={hide} onClose={onClose}>
			<ModalTitle>{i18n.t("Select organisation unit")}</ModalTitle>
			<ModalContent>
				<div className="column gap-16">
					{!hide && (
						<OrgUnitSelector
							showGroups
							showLevels
							showUserOptions
							value={selectedOrgUnits}
							searchable
							onUpdate={(value) => {
								setSelectedOrgUnits(value);
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

export function OrgUnitDimensionSelection() {
	const { orgUnit, setOrgUnit } = useDimensions();
	const {
		orgUnitGroups,
		orgUnitLevels,
		loading: metaLoading,
	} = useOrganisationUnitLevelsAndGroups();
	const orgUnitIds = useMemo(
		() => orgUnit?.orgUnits?.map(({ id }) => id),
		[orgUnit],
	);
	const { loading, orgUnits: orgUnitWithData } = useOrgUnits(orgUnitIds);

	const orgUnitsWithData: Array<{ id: string; name: string }> =
		useMemo(() => {
			if (metaLoading || loading) {
				return [];
			}
			if (orgUnitWithData) {
				return getSelectedOrgUnitSelectionDisplay(
					{
						...orgUnit,
						orgUnits: orgUnitWithData,
					},
					{
						orgUnitGroups,
						orgUnitLevels,
					},
				);
			} else {
				return getSelectedOrgUnitSelectionDisplay(orgUnit, {
					orgUnitGroups,
					orgUnitLevels,
				});
			}
		}, [loading, metaLoading, orgUnitWithData, orgUnit]);

	const {
		value: orgUnitHidden,
		setTrue: hideOrgUnit,
		setFalse: showOrgUnit,
	} = useBoolean(true);

	return (
		<>
			{loading ? null : (
				<CustomOrgUnitSelectorModal
					selected={{
						...orgUnit,
						orgUnits: orgUnitWithData,
					}}
					onClose={hideOrgUnit}
					hide={orgUnitHidden}
					onSelect={setOrgUnit}
				/>
			)}
			<DimensionSelection
				loading={loading}
				onClick={() => {
					showOrgUnit();
				}}
				selectedItems={compact(orgUnitsWithData)}
				title={i18n.t("Select organisation unit")}
			/>
		</>
	);
}
