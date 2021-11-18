import PropTypes from "prop-types";
import React, { useEffect } from "react";
import { useRecoilCallback } from "recoil";
import {
  dataElementsStateDictionary,
  dataSetDataElementCountState,
  dataSetReportingRatesStateDictionary,
  programDataElementCountState,
  programIndicatorStateDictionary,
} from "../../../Store";
import {
  indicatorGroupAggregateDataElements,
  indicatorGroupDataSets,
  indicatorGroupDenominatorDataElements,
  indicatorGroupNumeratorDataElements,
  indicatorGroupProgramDataElements,
  indicatorGroupPrograms,
} from "../../../Store/IndicatorGroup";
import { dataSourceTypes } from "../../../Utils/Models";
import DataElementPage from "../../DataElement";
import DataElementGroupPage from "../../DataElementGroup";
import FunctionPage2 from "../../Function/index2";
import Index from "../../Indicator/Index";
import IndicatorGroupPage from "../../IndicatorGroup";
import ProgramIndicatorPage from "../../ProgramIndicator";

export default function DataSourceSelector({ type, id }) {

  const reset = useRecoilCallback(({ reset }) => () => {
    reset(dataElementsStateDictionary);
    reset(dataSetReportingRatesStateDictionary);
    reset(programIndicatorStateDictionary);
    reset(dataSetDataElementCountState);
    reset(programDataElementCountState);
    reset(indicatorGroupDataSets);
    reset(indicatorGroupPrograms);
    reset(indicatorGroupProgramDataElements);
    reset(indicatorGroupAggregateDataElements);
    reset(indicatorGroupNumeratorDataElements);
    reset(indicatorGroupDenominatorDataElements);
  });
  useEffect(() => {
    return () => {
      reset();
    };
  }, [id]);

  if (type === dataSourceTypes.INDICATOR) {
    return <Index id={id} />;
  }
  if (type === dataSourceTypes.DATA_ELEMENT) {
    return <DataElementPage id={id} />;
  }
  if (type === dataSourceTypes.PROGRAM_DATA_ELEMENT) {
    return <DataElementPage id={id} />;
  }
  if (type === dataSourceTypes.PROGRAM_INDICATOR) {
    return <ProgramIndicatorPage id={id} />;
  }
  if (type === dataSourceTypes.DATA_ELEMENT_GROUP) {
    return <DataElementGroupPage id={id} />;
  }
  if (type === dataSourceTypes.INDICATOR_GROUP) {
    return <IndicatorGroupPage id={id} />;
  }
  if (type === dataSourceTypes.FUNCTION) {
    return <FunctionPage2 id={id} />;
  }
  return null;
}

DataSourceSelector.propTypes = {
  id: PropTypes.string.isRequired,
  type: PropTypes.oneOf(Object.values(dataSourceTypes)).isRequired,
};
