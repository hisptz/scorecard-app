import i18n from "@dhis2/d2-i18n";
import React from "react";
import SharingList from "./Components/SharingList";
import AddSharingAccess from "./Components/SharingList/Components/AddSharingAccess";

export default function Sharing() {
  return (
    <div className="p-16 pl-32">
      <div>
        <h3>{i18n.t("Sharing")}</h3>
      </div>
      <div>
        <p style={{ fontSize: 18 }}>{i18n.t("Shared With")}</p>
      </div>
      <div className="sharing-list">
        <SharingList />
      </div>
      <div className="pt-32">
        <p style={{ fontSize: 18 }}>{i18n.t("Add Access")}</p>
      </div>
      <div>
        <AddSharingAccess />
      </div>
    </div>
  );
}
