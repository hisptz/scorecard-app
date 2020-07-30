import { ScorecardIndicatorGroup } from '../../models/scorecard.model';
import { arraysAreNotAllowedMsg } from '@ngrx/store/src/models';
import { getScorecardIndicator } from './get-scorecard-indicator.helper';
import { getIndicatorHolders } from './get-indicator-holders.helper';

export function getScorecardIndicatorGroups(
  dataSettings
): ScorecardIndicatorGroup[] {
  const indicatorGroups: ScorecardIndicatorGroup[] = [];
  if (
    dataSettings &&
    dataSettings.indicator_holder_groups &&
    dataSettings.indicator_holders
  ) {
    const indicatorHolderGroups = dataSettings.indicator_holder_groups
      ? dataSettings.indicator_holder_groups
      : [];
    if (indicatorHolderGroups.length) {
      for (let i = 0; i < indicatorHolderGroups.length; i++) {
        const newGroup: ScorecardIndicatorGroup = {
          id: '',
          title: '',
          sortOrder: 0,
          style: {
            backgroundColor: '#ffffff', // default color: white
            color: '#000000', // default black
          },
          indicatorHolders: [],
        };
        newGroup.id = indicatorHolderGroups[i].id || '';
        newGroup.title = indicatorHolderGroups[i].name || '';
        newGroup.style = indicatorHolderGroups[i].holder_style
          ? indicatorHolderGroups[i].holder_style
          : newGroup.style;
        newGroup.sortOrder = i + 1;
        newGroup.indicatorHolders = getIndicatorHolders(
          dataSettings.indicator_holders,
          indicatorHolderGroups[i]?.indicator_holder_ids
        );
        indicatorGroups.push(newGroup);
      }
    }
  }

  return indicatorGroups;
}
