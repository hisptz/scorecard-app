import AverageDisplayType from '../constants/averageDisplayType'
import DataModel from "./base";


export default class ScorecardOption extends DataModel {
    get defaults() {
        return {
            averageDisplayType: AverageDisplayType.ALL,
            legend: true,
            title: true,
            itemNumber: true,
            emptyRows: false,
            showHierarchy: false,
            averageColumn: false,
            averageRow: false
        }
    }
}


