import i18n from "@dhis2/d2-i18n";
import React from "react";
import DataGroups from "./components/DataGroups";
import { SearchDataItem } from "./components/SearchDataItem";
import { DataItemSearchProvider } from "./states/searchState";


export default function DataGroupArea() {

	return (
		<DataItemSearchProvider>
			<div className="flex flex-col h-full">
				<div className="p-16">
					<SearchDataItem />
				</div>
				<h4 className="pl-16">{i18n.t("Groups")}</h4>
				<div style={{ height: "100%", overflowY: "auto", flex: 1, justifySelf: "stretch" }}>
					<DataGroups />
				</div>
			</div>
		</DataItemSearchProvider>
	);
}

