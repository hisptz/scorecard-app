import { atom } from "recoil";
import { DEFAULT_LAYOUT } from "../../../../../../../../../core/constants/layout";

const LayoutState = atom({
  key: "cell-analysis-layout",
  default: DEFAULT_LAYOUT,
});

export { LayoutState };
