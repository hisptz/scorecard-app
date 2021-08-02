import {Fn} from "@iapps/function-analytics";
import {Period} from "@iapps/period-utilities";
import {uniq} from 'lodash'

const analyticsQuery = {
    analytics: {
        resource: 'analytics',
        params: ({ou, periods, dataSources}) => ({
            dimension: [
                `ou:${ou}`,
                `pe:${periods.join(';')}`,
                `dx:${dataSources.join(';')}`
            ]
        })
    }
}

export default function getScorecardCellData({orgUnit, periods, dataSources}) {
    try {
        const previousPeriods = periods?.map((id) => {
            const period = new Period().getById(id)
            return period?.lastPeriod?.id
        })
        const allPeriods = uniq([...periods, ...previousPeriods])
        return new Fn.Analytics()
            .setOrgUnit(orgUnit)
            .setPeriod(allPeriods?.join(";"))
            .setData(dataSources.join(";"))
            .get();
    } catch (e) {
        console.log(e)
    }
}
