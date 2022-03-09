import { range, each, map, reduce, slice, join, flatten, last } from "lodash";

export function getTableRowsOrColumnsArray(dataItemsArray, dimension) {
  let flatDataItemsArray = [];
  each(range(dataItemsArray.length), (dataItemArrayIndex) => {
    if (flatDataItemsArray.length === 0) {
      if (dimension === "row") {
        each(dataItemsArray[dataItemArrayIndex], (rowsItem) => {
          flatDataItemsArray = [
            ...flatDataItemsArray,
            [{ ...rowsItem, column: 0, path: rowsItem.id }],
          ];
        });
      } else {
        flatDataItemsArray = [
          ...flatDataItemsArray,
          map(dataItemsArray[dataItemArrayIndex], (dataItem) => {
            return {
              ...dataItem,
              path: dataItem.id,
              textCenter: true,
              colSpan: reduce(
                map(
                  slice(dataItemsArray, dataItemArrayIndex + 1),
                  (slicedDataItemsArray) => slicedDataItemsArray.length
                ),
                (product, count) => product * count
              ),
            };
          }),
        ];
      }
    } else {
      let innerFlatDataItemsArray = [];
      each(flatDataItemsArray, (flatDataItems) => {
        const path = join(
          map(flatDataItems, (dataItemObject) => dataItemObject.id),
          "/"
        );
        if (dimension === "row") {
          each(
            dataItemsArray[dataItemArrayIndex],
            (dataItem, dataItemIndex) => {
              if (dataItemIndex === 0) {
                innerFlatDataItemsArray = [
                  ...innerFlatDataItemsArray,
                  [
                    ...map(flatDataItems, (flatDataItem) => {
                      const span = reduce(
                        map(
                          slice(
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
                        [dimension === "row" ? "rowSpan" : "colSpan"]: span,
                      };
                    }),
                    {
                      ...dataItem,
                      path: `${path}/${dataItem.id}`,
                      column: dataItemArrayIndex,
                    },
                  ],
                ];
              } else {
                innerFlatDataItemsArray = [
                  ...innerFlatDataItemsArray,
                  [
                    {
                      ...dataItem,
                      path: `${path}/${dataItem.id}`,
                      column: dataItemArrayIndex,
                    },
                  ],
                ];
              }
            }
          );
        }
      });

      if (dimension === "column") {
        const flatDataItems = last(flatDataItemsArray);

        innerFlatDataItemsArray = [
          ...flatDataItemsArray,
          flatten(
            map(range(flatDataItems.length), (flatDataItemCount) => {
              const previousPath = flatDataItems[flatDataItemCount].path;
              return map(dataItemsArray[dataItemArrayIndex], (dataItem) => {
                const path = `${previousPath}/${dataItem.id}`;

                return {
                  ...dataItem,
                  path,
                  dataRowIds: path.split("/"),
                  textCenter: true,
                  colSpan: reduce(
                    map(
                      slice(dataItemsArray, dataItemArrayIndex + 1),
                      (slicedDataItemsArray) => slicedDataItemsArray.length
                    ),
                    (product, count) => product * count
                  ),
                };
              });
            })
          ),
        ];
      }
      flatDataItemsArray = innerFlatDataItemsArray;
    }
  });

  return flatDataItemsArray;
}
