import i18n from "@dhis2/d2-i18n";
import PeriodIcon from "@material-ui/icons/AccessTime";
import React, { useState } from "react";
import { useRecoilState } from "recoil";
import PeriodSelectorModal from "../../../../../../../../../../../shared/Components/PeriodSelectorModal";
import { PeriodState } from "../../../state/period";
import SelectionWrapper from "./SelectionWrapper";

export default function PeriodSelector() {
  const [periodSelection, onChange] = useRecoilState(PeriodState);
  const { periods } = periodSelection ?? {};
  const [selectorOpen, setSelectorOpen] = useState(false);

  return (
    <div className="pr-16" style={{ width: "30%" }}>
      <SelectionWrapper
        label={i18n.t("Period(s)")}
        icon={PeriodIcon}
        onClick={setSelectorOpen}
        selectedItems={periods}
      />
      {selectorOpen && (
        <PeriodSelectorModal
          onClose={() => setSelectorOpen(false)}
          onSelect={onChange}
          initialValue={periodSelection}
        />
      )}
    </div>
  );
}
