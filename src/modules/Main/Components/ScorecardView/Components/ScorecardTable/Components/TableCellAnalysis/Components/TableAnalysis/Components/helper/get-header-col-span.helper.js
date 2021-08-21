import * as _ from 'lodash';
export  function getHeaderColSpan(tableRowHeaders) {
  const lastHeaders = _.last(tableRowHeaders)??[];
  const secondLastHeader = _.filter(
    tableRowHeaders[tableRowHeaders.length - 2] || [],
    (tableRowHeader) => !tableRowHeader.colSpan
  );

  return secondLastHeader.length + lastHeaders.length;
}
