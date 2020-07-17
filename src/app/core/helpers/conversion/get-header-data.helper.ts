export function getHeaderData(header) {
  const newHeaderData = {};
  newHeaderData['name'] = header && header.title ? header.title : '';
  newHeaderData['title'] = header && header.title ? header.title : '';
  newHeaderData['description'] =
    header && header.description ? header.description : '';
  newHeaderData['subtitle'] =
    header && header.sub_title ? header.sub_title : '';
  return newHeaderData;
}
