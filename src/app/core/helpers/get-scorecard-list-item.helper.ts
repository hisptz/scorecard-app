export function getScorecardListItem(scorecard) {
   const item = {...{}, ...scorecard};
  if (scorecard && scorecard.id && scorecard.description) {
      Object.keys(scorecard).forEach(key => {
          if (key !== 'id' && key !== 'title' && key !== 'description') {
              delete item[key];
          }
              });
      return item;
  }
  return null;
}
