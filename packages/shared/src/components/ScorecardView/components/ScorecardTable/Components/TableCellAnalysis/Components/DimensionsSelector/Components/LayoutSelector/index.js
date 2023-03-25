import i18n from "@dhis2/d2-i18n";
import LayoutIcon from "@material-ui/icons/ViewWeek";
import React, { useState } from "react";
import { useRecoilState } from "recoil";
import { LayoutState } from "../../../../state/layout";
import SelectionWrapper from "../SelectionWrapper";
import LayoutSelectorModal from "./Components/LayoutSelectorModal";

export default function LayoutSelector() {
  const [layoutSelection, onChange] = useRecoilState(LayoutState);
  const [selectorOpen, setSelectorOpen] = useState(false);
  return (
    <div style={{ width: "30%" }}>
      <SelectionWrapper
        icon={LayoutIcon}
        onClick={setSelectorOpen}
        selectedItems={null}
        label={i18n.t("Layout")}
      />
      {selectorOpen && (
        <LayoutSelectorModal
          initialValue={layoutSelection}
          onClose={() => setSelectorOpen(false)}
          onSelect={onChange}
        />
      )}
    </div>
  );
}
