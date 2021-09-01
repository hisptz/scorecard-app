import * as _ from 'lodash';


export  function getTableRowsOrColumnsArray(
  dataItemsArray,
  dimension
) {
  let flatDataItemsArray = [];
  _.each(_.range(dataItemsArray.length), (dataItemArrayIndex) => {
    if (flatDataItemsArray.length === 0) {
      if (dimension === 'row') {
        _.each(dataItemsArray[dataItemArrayIndex], (rowsItem) => {
          flatDataItemsArray = [
            ...flatDataItemsArray,
            [{ ...rowsItem, column: 0, path: rowsItem.id }]
          ];
        });
      } else {
        flatDataItemsArray = [
          ...flatDataItemsArray,
          _.map(dataItemsArray[dataItemArrayIndex], (dataItem) => {
            return {
              ...dataItem,
              path: dataItem.id,
              textCenter: true,
              colSpan: _.reduce(
                _.map(
                  _.slice(dataItemsArray, dataItemArrayIndex + 1),
                  (slicedDataItemsArray) => slicedDataItemsArray.length
                ),
                (product, count) => product * count
              )
            };
          })
        ];
      }
    } else {
      let innerFlatDataItemsArray = [];
      _.each(flatDataItemsArray, (flatDataItems) => {
        const path = _.join(
          _.map(flatDataItems, (dataItemObject) => dataItemObject.id),
          '/'
        );
        if (dimension === 'row') {
          _.each(
            dataItemsArray[dataItemArrayIndex],
            (dataItem, dataItemIndex) => {
              if (dataItemIndex === 0) {
                innerFlatDataItemsArray = [
                  ...innerFlatDataItemsArray,
                  [
                    ..._.map(flatDataItems, (flatDataItem) => {
                      const span = _.reduce(
                        _.map(
                          _.slice(
                            dataItemsArray,
                            flatDataItem.column + 1,
                            dataItemArrayIndex + 1
                          ),
                          (itemArray) => itemArray.length
                        ),
                        (product, count) => product * count
                      );
                      return {
                        ...flatDataItem,
                        path: flatDataItem.path ? flatDataItem.path : path,
                        [dimension === 'row' ? 'rowSpan' : 'colSpan']: span
                      };
                    }),
                    {
                      ...dataItem,
                      path: `${path}/${dataItem.id}`,
                      column: dataItemArrayIndex
                    }
                  ]
                ];
              } else {
                innerFlatDataItemsArray = [
                  ...innerFlatDataItemsArray,
                  [
                    {
                      ...dataItem,
                      path: `${path}/${dataItem.id}`,
                      column: dataItemArrayIndex
                    }
                  ]
                ];
              }
            }
          );
        }
      });

      if (dimension === 'column') {
        const flatDataItems = _.last(flatDataItemsArray);

        innerFlatDataItemsArray = [
          ...flatDataItemsArray,
          _.flatten(
            _.map(
              _.range(flatDataItems.length),
              (flatDataItemCount) => {
                const previousPath = flatDataItems[flatDataItemCount].path;
                return _.map(
                  dataItemsArray[dataItemArrayIndex],
                  (dataItem) => {
                    const path = `${previousPath}/${dataItem.id}`;

                    return {
                      ...dataItem,
                      path,
                      dataRowIds: path.split('/'),
                      textCenter: true,
                      colSpan: _.reduce(
                        _.map(
                          _.slice(dataItemsArray, dataItemArrayIndex + 1),
                          (slicedDataItemsArray) =>
                            slicedDataItemsArray.length
                        ),
                        (product, count) => product * count
                      )
                    };
                  }
                );
              }
            )
          )
        ];
      }
      flatDataItemsArray = innerFlatDataItemsArray;
    }
  });

  return flatDataItemsArray;
}
