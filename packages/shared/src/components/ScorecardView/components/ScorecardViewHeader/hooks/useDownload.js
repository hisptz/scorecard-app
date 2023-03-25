import {useAlert} from "@dhis2/app-runtime";
import {useEffect, useMemo, useState} from "react";
import {useReactToPrint} from "react-to-print";
import {useRecoilValue, useRecoilValueLoadable} from "recoil";
import {downloadALMAData, downloadALMAMeta, downloadCSV, downloadExcel,} from "../services/download";
import {
    InitialOrgUnits,
    PeriodResolverState,
    ScorecardDataLoadingState,
    ScorecardDataSourceState,
    ScorecardOrgUnitState,
    ScorecardViewState
} from "../../../../../state";
import {DownloadTypes} from "../../../../../constants";


export default function useDownload(downloadRef, dataEngine) {
    const title = useRecoilValue(ScorecardViewState("title"));
    const legendDefinitions = useRecoilValue(
        ScorecardViewState("legendDefinitions")
    );
    const orgUnitState = useRecoilValueLoadable(InitialOrgUnits);
    const orgUnits = useMemo(() => {
        if (orgUnitState.state === "hasValue") {
            return orgUnitState.contents?.orgUnits;
        }
        return [];
    }, [orgUnitState]);
    const orgUnitsIds = useMemo(() => orgUnits?.map(({id}) => id), [orgUnits]);
    const {filteredOrgUnits, childrenOrgUnits} = useRecoilValue(
        ScorecardOrgUnitState(orgUnitsIds)
    );
    const dataHolders = useRecoilValue(ScorecardDataSourceState);
    const allOrgUnits = useMemo(
        () => [...filteredOrgUnits, ...childrenOrgUnits],
        [filteredOrgUnits, childrenOrgUnits]
    );
    const periods = useRecoilValue(PeriodResolverState);
    const loading = useRecoilValue(ScorecardDataLoadingState(orgUnitsIds));
    const [data, setData] = useState();
    const {show} = useAlert(
        ({message}) => message,
        ({type}) => ({...type, duration: 3000})
    );
    const handlePDFDownload = useReactToPrint({
        content: () => downloadRef?.current,
        documentTitle: `${title}`
    });

    function subscribe() {
        if (loading !== undefined && !loading && orgUnitState.state === "hasValue") {
            const subscription = dataEngine
                .getAllOrgUnitData(allOrgUnits?.map(({id}) => id))
                .subscribe(setData);
            return () => subscription.unsubscribe();
        }
    }

    useEffect(subscribe, [loading, allOrgUnits, dataEngine]);

    const downloadFunction = (type) => {
        if (loading !== undefined && !loading && orgUnitState.state === "hasValue") {
            switch (type) {
                case DownloadTypes.EXCEL:
                    return downloadExcel({
                        periods,
                        data,
                        orgUnits: allOrgUnits,
                        dataHolders,
                        title,
                    });
                case DownloadTypes.CSV:
                    return downloadCSV({
                        periods,
                        data,
                        orgUnits: allOrgUnits,
                        dataHolders,
                        title,
                    });
                case DownloadTypes.PDF:
                    return handlePDFDownload();
                case "ALMAData":
                    return downloadALMAData({
                        periods,
                        data,
                        orgUnits,
                        dataHolders,
                        title,
                        legendDefinitions,
                    });
                case "ALMAMeta":
                    return downloadALMAMeta({
                        orgUnits: allOrgUnits,
                        dataHolders,
                        title,
                    });
                default:
                    return;
            }
        }
    };

    const download = (type) => {
        const error = downloadFunction(type);
        if (error) {
            show({
                message: error?.message ?? error.details ?? error?.toString(),
            });
        }
    };

    return {
        download,
    };
}
