import PropTypes from "prop-types";
import React from "react";
import CalendarSpecificPeriodDimension from "./CalendarSpecificPeriodDimension";
import {CalendarTypes} from "../../../../constants";

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
