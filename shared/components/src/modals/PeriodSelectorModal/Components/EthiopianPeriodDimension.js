import PropTypes from "prop-types";
import React from "react";
import {CalendarTypes} from "@hisptz/scorecard-constants";
import CalendarSpecificPeriodDimension from "./CalendarSpecificPeriodDimension";

export default function EthiopianPeriodDimension({
                                                     onSelect,
                                                     selectedPeriods,
                                                 }) {
    return (
        <CalendarSpecificPeriodDimension
            onSelect={onSelect}
            selectedPeriods={selectedPeriods}
            calendar={CalendarTypes.ETHIOPIAN}
        />
    );
}

EthiopianPeriodDimension.propTypes = {
    selectedPeriods: PropTypes.array.isRequired,
    onSelect: PropTypes.func.isRequired,
};
