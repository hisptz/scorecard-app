export function getHeaderData(header) {
  let newHeaderData = {};
  if (header) {
    const name = header.title ? header.title : '';
    const title = header.title ? header.title : '';
    const description = header.description ? header.description : '';
    const subtitle = header.sub_title ? header.sub_title : '';
    newHeaderData = { ...{}, name, title, description, subtitle };
  }
  return newHeaderData;
}
