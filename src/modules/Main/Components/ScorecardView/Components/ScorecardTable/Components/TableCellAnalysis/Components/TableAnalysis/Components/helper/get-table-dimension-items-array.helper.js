import * as _ from 'lodash';
export   function getTableDimensionItemsArray(
  dimensionItems,
  analyticsObject
) {
  return _.map(dimensionItems, (dimensionItem) => {
    const metadataIds = analyticsObject.metaData[dimensionItem];
    return _.map(metadataIds || [], (metadataId) => {
      const metadataName =
        analyticsObject &&
        analyticsObject.metaData &&
        analyticsObject.metaData.names
          ? analyticsObject.metaData.names[metadataId]
          : '';
      return {
        id: metadataId,
        name: metadataName
      };
    });
  });
}
