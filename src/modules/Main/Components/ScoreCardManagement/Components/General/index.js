import React from "react";
import { GENERAL_HELP_STEPS } from "../../../../../../core/constants/help/scorecardManagement";
import Help from "../Help";
import GeneralForm from "./Components/GeneralForm";

export default function GeneralScorecardForm() {
  return (
    <div className="container">
      <Help helpSteps={GENERAL_HELP_STEPS} />
      <div className="column space-between">
        <GeneralForm />
      </div>
    </div>
  );
}
