import { assign, map } from "lodash";

export function getChartAxisItems(analyticsObject, axisTypeArray, isCategory) {
  let items = [];
  const metadataNames = analyticsObject.metaData.names;
  axisTypeArray?.forEach((axisType, axisIndex) => {
    const itemKeys = analyticsObject.metaData[axisType] ?? [];
    if (itemKeys) {
      if (axisIndex > 0) {
        const availableItems = assign([], items);
        items = [];
        itemKeys.forEach((itemKey) => {
          availableItems.forEach((item) => {
            items.push({
              id: item.id + "_" + itemKey,
              name: item.name + "_" + metadataNames[itemKey].trim(),
            });
          });
        });
      } else {
        items = map(itemKeys, (itemKey) => {
          return {
            id: itemKey,
            name: metadataNames[itemKey].trim(),
          };
        });
      }
    }
  });
  return items;
}
