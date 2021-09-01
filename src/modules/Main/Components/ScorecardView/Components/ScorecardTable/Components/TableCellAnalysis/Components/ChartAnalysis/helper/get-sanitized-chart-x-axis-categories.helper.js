import * as _ from 'lodash';
export function getSanitizedChartXAxisCategories(
  series,
  xAxisItems
) {
  const reversedXAxisItems = _.reverse(xAxisItems || []);
  let newCategories = [];
  if (series) {
    const seriesDataObjects = _.map(
      series,
      (seriesObject) => seriesObject.data
    );

    if (seriesDataObjects) {
      const seriesCategoryNamesArray = _.map(
        seriesDataObjects,
        (seriesData) => {
          return _.map(seriesData, (data) => {
            const idArray = data.name.split('_');
            const newCategoryArray = [];
            if (idArray) {
              const reversedIdArray = _.reverse(idArray);
              _.times(idArray.length, (num) => {
                if (num === 0) {
                  const parentCategoryItem = _.find(
                    reversedXAxisItems[num] || [],
                    ['id', reversedIdArray[num]]
                  );
                
                  newCategoryArray.push({
                    id: reversedIdArray[num],
                    name: parentCategoryItem
                      ? parentCategoryItem.label || parentCategoryItem.name
                      : reversedIdArray[num],
                  });
                } else {
                  const parentCategory = _.find(newCategoryArray, [
                    'id',
                    reversedIdArray[num - 1],
                  ]);

                  if (parentCategory) {
                    const parentCategoryIndex = _.findIndex(
                      newCategoryArray,
                      parentCategory
                    );
                    let newChildrenCategories = parentCategory.categories
                      ? parentCategory.categories
                      : [];
                    const childrenCategoryItem = _.find(
                      reversedXAxisItems[num] || [],
                      ['id', reversedIdArray[num]]
                    );

                    newChildrenCategories = [
                      ...newChildrenCategories,
                      childrenCategoryItem
                        ? childrenCategoryItem.label ||
                          childrenCategoryItem.name
                        : reversedIdArray[num],
                    ];

                    parentCategory.categories = _.assign(
                      [],
                      newChildrenCategories
                    );

                    newCategoryArray[parentCategoryIndex] = parentCategory;
                  }
                }
              });
            }
            return newCategoryArray[0];
          });
        }
      );

      if (seriesCategoryNamesArray) {
        const groupedCategoryNames = _.groupBy(
          seriesCategoryNamesArray[0],
          'name'
        );
        const categoryNameGroupKeys = _.map(
          seriesCategoryNamesArray[0],
          (category) => category.name
          
        );
        const sanitizedCategoryNames = [];
        _.forEach(categoryNameGroupKeys, (key) => {
          const categories = _.filter(
            _.map(groupedCategoryNames[key], (categoryObject) => {
              return categoryObject.categories
                ? categoryObject.categories[0]
                : null;
            }),
            (category) => category !== null
          );
          if (categories.length === 0) {
            sanitizedCategoryNames.push({ name: key });
          } else {
            sanitizedCategoryNames.push({
              name: key,
              categories: categories,
            });
          }
        });

        newCategories = _.assign([], sanitizedCategoryNames);
      }
    }
  }
  return _.uniqBy(newCategories, 'name');
}
