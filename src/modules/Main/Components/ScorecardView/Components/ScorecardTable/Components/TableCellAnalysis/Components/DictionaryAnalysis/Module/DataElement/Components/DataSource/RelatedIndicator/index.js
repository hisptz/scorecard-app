import React from "react";
import RelatedIndicatorTable from "../../../../../Shared/Componets/RelatedIndicatorTable";
import i18n from "@dhis2/d2-i18n";

export default function RelatedIndicator({id}){


    return <div>
        <h3>{i18n.t("Related Indicators")} </h3>
        <RelatedIndicatorTable id={id} />
    </div>

}
