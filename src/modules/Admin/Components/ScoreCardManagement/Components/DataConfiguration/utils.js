import {uid} from "../../../../../../shared/utils/utils";


export function generateNewGroupData(groups) {

    return {
        id: uid(),
        title: `Group ${groups?.length + 1 || 1}`,
        dataSources: []
    }
}
