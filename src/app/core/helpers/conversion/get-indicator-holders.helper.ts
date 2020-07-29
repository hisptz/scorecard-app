import { map, flattenDeep } from 'lodash';
import { IndicatorHolder } from '../../models/scorecard.model';
import { getScorecardIndicator } from './get-scorecard-indicator.helper';
export function getIndicatorHolders(
  indicatorHolders: any[],
  indicatorHolderIds: any[]
): IndicatorHolder[] {
  return flattenDeep(
    map(indicatorHolders || [], (holder) => {
      const indicatorHolder: IndicatorHolder = { id: '', indicators: [] };
      if (
        indicatorHolderIds &&
        indicatorHolderIds.length &&
        holder &&
        holder.holder_id &&
        indicatorHolderIds.includes(holder.holder_id)
      ) {
        indicatorHolder.id = holder.holder_id;
        if (holder && holder.indicators && holder.indicators.length) {
          for (const indicator of holder.indicators) {
            const newIndicator = getScorecardIndicator(indicator);
            indicatorHolder.indicators.push(newIndicator);
          }
        }
        return indicatorHolder;
      }
      return [];
    }) || []
  );
}
