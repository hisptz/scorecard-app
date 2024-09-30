import { useOldScorecards } from "../hooks/data";
import { FullPageError } from "@scorecard/shared";
import { CircularLoader } from "@dhis2/ui";
import { SimpleDataTable, SimpleDataTableColumn } from "@hisptz/dhis2-ui";
import i18n from "@dhis2/d2-i18n";
import { useMemo, useState } from "react";
import { uniq } from "lodash";
import { MigrateButton } from "./MigrateButton";


const columns: SimpleDataTableColumn[] = [
	{
		key: "title",
		label: i18n.t("Title")
	},
	{
		key: "description",
		label: i18n.t("Description")
	}

];

export function OldScorecardList() {
	const { loading, scorecards, error, refetch } = useOldScorecards();
	const [selectedConfig, setSelectedConfig] = useState<string[]>([]);
	const [progress, setProgress] = useState<Record<string, "SUCCESS" | "EXISTS" | "FAILED">>({});

	const onRemove = (values: string[]) => {
		setSelectedConfig((prevState) => {
			return prevState.filter((value) => !values.includes(value));
		});
	};

	const onAdd = (values: string[]) => {
		setSelectedConfig((prevState) => uniq([...prevState, ...values]));
	};

	const rows = useMemo(() => scorecards?.map((config) => {

		return {
			id: config.id,
			title: config.header.title,
			description: config.header.description
		};
	}) ?? [], [scorecards]);

	if (loading) {
		return <div className="column center items-center w-100 h-100 flex-1">
			<CircularLoader />
		</div>;
	}

	if (error) {
		return (
			<FullPageError error={error} resetErrorBoundary={() => {
				refetch();
			}} />
		);
	}

	return (
		<div className="column w-100 h-100 flex-1 gap-16 pb-32">
			<SimpleDataTable tableProps={{ scrollHeight: "100%" }} onRowDeselect={onRemove} selectedRows={selectedConfig} onRowSelect={onAdd} selectable columns={columns} rows={rows} />
			<div className="row end">
				{
					!!scorecards && (<MigrateButton onClearSelection={() => setSelectedConfig([])} progress={progress} onProgressUpdate={setProgress} selected={selectedConfig} scorecards={scorecards!} />)
				}
			</div>
		</div>
	);

}
