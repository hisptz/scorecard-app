import {flatten} from 'lodash'
import {useEffect, useMemo, useState} from "react";
import {useRecoilValue} from "recoil";
import {utils as xlsx, writeFile} from 'xlsx'
import {DownloadTypes} from "../../../../../../../core/constants/download";
import {PeriodResolverState} from "../../../../../../../core/state/period";
import {
    scorecardDataEngine,
    ScorecardDataLoadingState,
    ScorecardDataSourceState,
    ScorecardOrgUnitState,
    ScorecardViewState
} from "../../../../../../../core/state/scorecard";


function generateExcelJSON({periods = [], data = {}, orgUnits = [], dataSources = []}) {
    return orgUnits?.map(({displayName: orgUnitName, id: orgUnitId}) => {
        const object = {'Organisation Unit': orgUnitName}
        for (const dataSource of dataSources) {
            const {id: dataSourceId, displayName: dataSourceName} = dataSource ?? {}
            for (const period of periods) {
                const {id: periodId, name: periodName} = period ?? {}
                object[`${dataSourceName}-${periodName}`] = data[`${dataSourceId}_${orgUnitId}_${periodId}`]?.current
            }
        }
        return object;
    })

}

function downloadExcelFileTypes({periods, data, orgUnits, dataHolders, title, type}){
    try {
        const json = generateExcelJSON({
            periods,
            data,
            orgUnits,
            dataSources: flatten(dataHolders?.map(({dataSources}) => dataSources))
        })
        const sheet = xlsx.json_to_sheet(json)
        const workbook = xlsx.book_new()
        xlsx.book_append_sheet(workbook, sheet, `${title}`)
        writeFile(workbook, `${title}.${type}`,)
    } catch (e) {
        return e;
    }
}

function downloadExcel({periods, data, orgUnits, dataHolders, title}) {
    return downloadExcelFileTypes({periods, data, orgUnits, dataHolders, title, type: 'xlsx'})
}

function downloadJSON({periods, data, orgUnits, dataHolders, title}) {

}

function downloadCSV({periods, data, orgUnits, dataHolders,  title}) {
    return downloadExcelFileTypes({periods, data, orgUnits, dataHolders, title, type: 'csv'})

}

function downloadPDF() {
    window.print()
}

export default function useDownload() {
    const title = useRecoilValue(ScorecardViewState('title'))
    const {orgUnits} = useRecoilValue(ScorecardViewState('orgUnitSelection'))
    const {filteredOrgUnits, childrenOrgUnits} = useRecoilValue(ScorecardOrgUnitState(orgUnits))
    const dataHolders = useRecoilValue(ScorecardDataSourceState)
    const allOrgUnits = useMemo(() => [...filteredOrgUnits, ...childrenOrgUnits], [filteredOrgUnits, childrenOrgUnits]);
    const periods = useRecoilValue(PeriodResolverState)
    const loading = useRecoilValue(ScorecardDataLoadingState)
    const [data, setData] = useState();

    function subscribe() {
        if (loading !== undefined && !loading) {
            const subscription = scorecardDataEngine.getAllOrgUnitData(allOrgUnits?.map(({id}) => id)).subscribe(setData);
            return subscription.unsubscribe
        }
    }

    useEffect(subscribe, [loading, allOrgUnits])

    const download = (type) => {
        switch (type) {
            case DownloadTypes.EXCEL:
                return downloadExcel({periods, data, orgUnits: allOrgUnits, dataHolders, title})
            case DownloadTypes.CSV:
                return downloadCSV({periods, data, orgUnits: allOrgUnits, dataHolders, title})
            case DownloadTypes.JSON:
                return downloadJSON({periods, data, orgUnits: allOrgUnits, dataHolders, title})
            case DownloadTypes.PDF:
                return downloadPDF({periods, data, orgUnits: allOrgUnits, dataHolders, title})
            default:
                return;
        }
    }

    return {
        download
    }
}
