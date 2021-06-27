import { Legend } from '../../models/scorecard.model';

export function getLegendDefinitions(definitions): Legend[] {
  const sanitizedDefinitions: Legend[] = [];
  if (definitions && definitions.length) {
    for (const defn of definitions) {
      if (defn) {
        let newDefn: Legend = { id: '', color: '', name: '', default: false };
        newDefn.id = defn.id ? defn.id : '';
        newDefn.name = defn.definition ? defn.definition : '';
        newDefn.color = defn.color ? defn.color : '';
        newDefn.default = defn.default ? true : false;
        newDefn.endValue = defn.endValue ? defn.endValue : '';
        newDefn.startValue = defn.startValue ? defn.startValue : '';
        newDefn = { ...{}, ...newDefn };
        sanitizedDefinitions.push(newDefn);
      }
    }
  }
  return sanitizedDefinitions;
}
