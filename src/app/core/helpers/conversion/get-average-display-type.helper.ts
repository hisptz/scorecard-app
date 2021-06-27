import { AverageDisplayType } from '../../models/scorecard.model';

export function getAverageDisplayType(averageSelection): AverageDisplayType {
  switch (averageSelection) {
    case 'all':
      return AverageDisplayType.ALL;
    case 'above':
      return AverageDisplayType.ABOVE_AVERAGE;
    case 'below':
      return AverageDisplayType.BELOW_AVERAGE;
    default:
      return AverageDisplayType.ALL;
  }
}
