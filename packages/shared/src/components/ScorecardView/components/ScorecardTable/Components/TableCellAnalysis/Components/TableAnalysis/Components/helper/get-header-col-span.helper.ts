import { filter, last } from "lodash";

export function getHeaderColSpan(tableRowHeaders: any) {
	const lastHeaders: any = last(tableRowHeaders);
	const secondLastHeader = filter(
		tableRowHeaders[tableRowHeaders.length - 2] || [],
		(tableRowHeader) => !tableRowHeader.colSpan,
	);

	return secondLastHeader.length + lastHeaders.length;
}
