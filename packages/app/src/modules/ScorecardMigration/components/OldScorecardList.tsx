import { useOldScorecards } from "../hooks/data";
import { FullPageError } from "@scorecard/shared";
import { CircularLoader, Tag } from "@dhis2/ui";
import { SimpleDataTable, SimpleDataTableColumn, SimpleDataTableRow } from "@hisptz/dhis2-ui";
import i18n from "@dhis2/d2-i18n";
import { useEffect, useMemo, useState } from "react";
import { fromPairs, get, uniq } from "lodash";
import { MigrateButton } from "./MigrateButton";


const columns: SimpleDataTableColumn[] = [
	{
		key: "title",
		label: i18n.t("Title")
	},
	{
		key: "description",
		label: i18n.t("Description")
	},
	{
		key: "status",
		label: i18n.t("Status")
	}

];

export function OldScorecardList() {
	const { loading, scorecards, error, refetch, existingScorecards } = useOldScorecards();
	const [selectedConfig, setSelectedConfig] = useState<string[]>([]);
	const [progress, setProgress] = useState<Record<string, "SUCCESS" | "EXISTS" | "FAILED">>({});


	const onRemove = (values: string[]) => {
		setSelectedConfig((prevState) => {
			return prevState.filter((value) => !values.includes(value));
		});
	};

	const onAdd = (values: string[]) => {
		setSelectedConfig((prevState) => {
			return uniq([...prevState, ...values]).filter((value) => !["EXISTS", "SUCCESS"].includes(get(progress, value)));
		});
	};

	const getStatus = (status?: "SUCCESS" | "EXISTS" | "FAILED") => {
		switch (status) {
			case "SUCCESS":
				return <Tag bold positive>{i18n.t("Success")}</Tag>;
			case "EXISTS":
				return <Tag bold positive>{i18n.t("Migrated")}</Tag>;
			case "FAILED":
				return <Tag bold negative>{i18n.t("Failed")}</Tag>;
			default:
				return "";
		}
	};

	const rows = useMemo(() => scorecards?.map((config) => {
		const selectable = !["EXISTS", "SUCCESS"].includes(get(progress, config.id));

		return {
			id: config.id,
			title: config.header.title,
			description: config.header.description,
			status: getStatus(get(progress, config.id)),
			cellsStyle: {
				bordered: true,
				disableSelection: !selectable
			}
		} as SimpleDataTableRow;
	}) ?? [], [scorecards]);

	useEffect(() => {
		if (existingScorecards) {
			setProgress(fromPairs(existingScorecards.map((id) => ([id, "EXISTS"]))));
		}
	}, [existingScorecards]);

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
			<SimpleDataTable tableProps={{ scrollHeight: "100%", bordered: true }} onRowDeselect={onRemove} selectedRows={selectedConfig} onRowSelect={onAdd} selectable columns={columns} rows={rows} />
			<div className="row end">
				{
					!!scorecards && (<MigrateButton onClearSelection={() => setSelectedConfig([])} progress={progress} onProgressUpdate={setProgress} selected={selectedConfig} scorecards={scorecards!} />)
				}
			</div>
		</div>
	);

}
