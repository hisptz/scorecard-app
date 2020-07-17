import { PeriodSelection } from '../../models/scorecard.model';
export function getPeriodSelectionData(periodData): PeriodSelection {
    const sanitizedSelections: PeriodSelection = { items: [] };
    if (periodData && periodData.length) {
      for (const period of periodData) {
        let newPeriod = { id: '', name: '', type: '' };
        newPeriod['id'] = period && period.id ? period.id : '';
        newPeriod['name'] = period && period.name ? period.name : '';
        newPeriod['type'] = period && period.type ? period.type : '';
        newPeriod = { ...{}, ...newPeriod };
        sanitizedSelections.items.push(newPeriod);
      }
    }
    return sanitizedSelections;
  }
  