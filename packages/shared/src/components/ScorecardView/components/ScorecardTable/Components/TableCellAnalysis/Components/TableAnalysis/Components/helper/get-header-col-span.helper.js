import { filter, last } from "lodash";

export function getHeaderColSpan(tableRowHeaders) {
  const lastHeaders = last(tableRowHeaders);
  const secondLastHeader = filter(
    tableRowHeaders[tableRowHeaders.length - 2] || [],
    (tableRowHeader) => !tableRowHeader.colSpan
  );

  return secondLastHeader.length + lastHeaders.length;
}
