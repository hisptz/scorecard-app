import i18n from "@dhis2/d2-i18n";
import { Button, Input } from "@dhis2/ui";
import React, { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { IconCross24 } from "@dhis2/ui-icons";

export function SearchArea() {
	const [searchParams, setSearchParams] = useSearchParams();
	const onClearSearchParams = () => {
		setSearchParams((prev) => {
			const updatedParams = new URLSearchParams(prev);
			updatedParams.delete("query");
			return updatedParams;
		});
	};
	const value = useMemo(
		() => searchParams.get("query") ?? undefined,
		[searchParams.get("query")],
	);

	return (
		<div style={{ gap: 8, display: "flex" }} className="row">
			<div className="flex-1">
				<Input
					className="search-input"
					value={value}
					onChange={({ value }: { value?: string }) => {
						setSearchParams((prev) => {
							const updatedSearchParams = new URLSearchParams(
								prev,
							);
							if (value) {
								updatedSearchParams.set("query", value);
							} else {
								updatedSearchParams.delete("query");
							}
							return updatedSearchParams;
						});
					}}
					placeholder={i18n.t("Search by id, title, or description")}
				/>
			</div>
			{searchParams.get("query") && (
				<Button icon={<IconCross24 />} onClick={onClearSearchParams}>
					{i18n.t("Clear search")}
				</Button>
			)}
		</div>
	);
}
