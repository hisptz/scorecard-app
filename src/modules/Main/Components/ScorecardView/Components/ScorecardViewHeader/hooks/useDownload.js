import {useAlert} from "@dhis2/app-runtime";
import {useEffect, useMemo, useState} from "react";
import {useRecoilValue} from "recoil";
import {DownloadTypes} from "../../../../../../../core/constants/download";
import {PeriodResolverState} from "../../../../../../../core/state/period";
import {
    scorecardDataEngine,
    ScorecardDataLoadingState,
    ScorecardDataSourceState,
    ScorecardOrgUnitState,
    ScorecardViewState
} from "../../../../../../../core/state/scorecard";
import {downloadALMAData, downloadALMAMeta, downloadCSV, downloadExcel, downloadPDF} from "../services/download";


export default function useDownload() {
    const title = useRecoilValue(ScorecardViewState('title'))
    const {orgUnits} = useRecoilValue(ScorecardViewState('orgUnitSelection'))
    const {filteredOrgUnits, childrenOrgUnits} = useRecoilValue(ScorecardOrgUnitState(orgUnits))
    const dataHolders = useRecoilValue(ScorecardDataSourceState)
    const allOrgUnits = useMemo(() => [...filteredOrgUnits, ...childrenOrgUnits], [filteredOrgUnits, childrenOrgUnits]);
    const periods = useRecoilValue(PeriodResolverState)
    const loading = useRecoilValue(ScorecardDataLoadingState)
    const [data, setData] = useState();
    const {show} = useAlert(({message}) => message, ({type}) => ({...type, duration: 3000}))

    function subscribe() {
        if (loading !== undefined && !loading) {
            const subscription = scorecardDataEngine.getAllOrgUnitData(allOrgUnits?.map(({id}) => id)).subscribe(setData);
            return ()=>subscription.unsubscribe();
        }
    }

    useEffect(subscribe, [loading, allOrgUnits])

    const downloadFunction = (type) => {
        if (loading !== undefined && !loading) {
            switch (type) {
                case DownloadTypes.EXCEL:
                    return downloadExcel({periods, data, orgUnits: allOrgUnits, dataHolders, title})
                case DownloadTypes.CSV:
                    return downloadCSV({periods, data, orgUnits: allOrgUnits, dataHolders, title})
                case DownloadTypes.PDF:
                    return downloadPDF({periods, data, orgUnits: allOrgUnits, dataHolders, title})
                case 'ALMAData':
                    return downloadALMAData({periods, data, orgUnits, dataHolders, title})
                case 'ALMAMeta':
                    return downloadALMAMeta({orgUnits: allOrgUnits, dataHolders, title})
                default:
                    return;
            }
        }
    }

    const download = (type) => {
        const error = downloadFunction(type)
        if (error) {
            show({
                message: error?.message ?? error.details ?? error?.toString()
            })
        }
    }

    return {
        download
    }
}
