import { Legend } from '../../models/scorecard.model';

export function getLegendDefinitions(definitions): Legend[] {
    const sanitizedDefinitions: Legend[] = [];
    if (definitions && definitions.length) {
      for (const defn of definitions) {
        let newDefn: Legend = { id: '', color: '', name: '', default: false };
        newDefn['id'] =
          defn && defn.hasOwnProperty('id') && defn.id ? defn.id : '';
        newDefn['name'] =
          defn && defn.hasOwnProperty('definition') && defn.definition
            ? defn.definition
            : '';
        newDefn['color'] =
          defn && defn.hasOwnProperty('color') && defn.color ? defn.color : '';
        newDefn['default'] =
          defn && defn.hasOwnProperty('default') && defn.default ? true : false;
        newDefn['endValue'] =
          defn && defn.hasOwnProperty('endValue') && defn.endValue
            ? defn.endValue
            : '';
        newDefn['startValue'] =
          defn && defn.hasOwnProperty('startValue') && defn.startValue
            ? defn.startValue
            : '';
        newDefn = { ...{}, ...newDefn };
        sanitizedDefinitions.push(newDefn);
      }
    }
    return sanitizedDefinitions;
  }