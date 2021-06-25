import {find} from 'lodash'
import {uid} from "../../../../../../shared/utils/utils";

export function generateNewGroupData(groups) {

    return {
        id: uid(),
        title: `Group ${groups?.length + 1 || 1}`,
        dataSources: []
    }
}


export function getLegend(value, legends){
    return find(legends, ({min, max})=>parseInt(min) < value && parseInt(max) >= value)
}
