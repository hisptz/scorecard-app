import { CustomPeriodSelectorModal } from "./CustomPeriodSelectorModal";
import { DimensionSelection } from "./DimensionSelection";
import { compact } from "lodash";
import i18n from "@dhis2/d2-i18n";
import React, { useMemo } from "react";
import { useDimensions } from "../../../hooks/dimensions";
import { useBoolean } from "usehooks-ts";
import { PeriodUtility } from "@hisptz/dhis2-utils";

export function PeriodDimensionSelector() {
	const { periods, setPeriod } = useDimensions();
	const {
		value: periodHidden,
		setTrue: hidePeriod,
		setFalse: showPeriod,
	} = useBoolean(true);

	const periodObjects = useMemo(() => {
		return (
			periods?.map((period) => PeriodUtility.getPeriodById(period)) ?? []
		);
	}, [periods]);

	return (
		<>
			<CustomPeriodSelectorModal
				onClose={hidePeriod}
				hide={periodHidden}
				onSelect={setPeriod}
				selected={periods}
			/>
			<DimensionSelection
				onClick={showPeriod}
				selectedItems={compact(periodObjects)}
				title={i18n.t("Select period")}
			/>
		</>
	);
}
