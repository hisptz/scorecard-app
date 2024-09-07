import i18n from "@dhis2/d2-i18n";
import { Input } from "@dhis2/ui";
import React, { useRef, useState } from "react";
import { debounce, isEmpty } from "lodash";
import { ScorecardConfig, ScorecardDataGroup } from "@hisptz/dhis2-analytics";
import { useWatch } from "react-hook-form";
import { useDataItemSearchState } from "../states/searchState";


export function SearchDataItem() {
	const [keyword, setKeyword] = useState();
	const dataGroups = useWatch<ScorecardConfig>({
		name: "dataSelection.dataGroups"
	});
	const [, setFilteredDataItems] = useDataItemSearchState();

	const searchGroups = (keyword: string): string[] => {
		if (keyword) {
			return (dataGroups as ScorecardDataGroup[])?.filter((dataGroup) => {
				return dataGroup.dataHolders.find((dataHolder) => {
					return !!dataHolder.dataSources.find((dataSource) => {
						const searchIndex = `${dataSource.id} ${dataSource.label} ${dataSource.description}`.toLowerCase();
						return searchIndex.match(RegExp(keyword.toLowerCase()));
					});
				});
			})
				?.map(({ id }: any) => id);
		} else {
			return [];
		}
	};

	const onSearch = useRef(
		debounce((keyword) => {
			if (!isEmpty(keyword)) {
				const filteredGroups = searchGroups(keyword);
				setFilteredDataItems(filteredGroups);
			} else {

			}
		}, 500)
	);


	return (
		<Input
			value={keyword}
			name=""
			onChange={({ value }: any) => {
				setKeyword(value);
				onSearch.current(value);
			}}
			placeholder={i18n.t("Search for Indicator")}
		/>
	);
}
