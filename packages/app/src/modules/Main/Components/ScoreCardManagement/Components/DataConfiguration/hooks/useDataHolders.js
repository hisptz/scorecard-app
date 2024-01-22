import {ScorecardIndicatorGroup} from "@scorecard/shared";
import {flattenDeep} from "lodash";
import {useMemo} from "react";
import {useFormContext} from "react-hook-form";
import {customChunk} from "../Components/DataGroups/Components/DataGroup/utils";


export default function useDataHolders({index}) {
    const {watch} = useFormContext();
    const path = useMemo(() => ["dataSelection", "dataGroups", index].join("."), [index]);
    const group = watch(path);
    const {dataHolders} = group ?? new ScorecardIndicatorGroup();
    const dataHolderChunks = customChunk(dataHolders);
    const selectedDataSourcesIds = flattenDeep(
        dataHolders?.map(({dataSources}) => dataSources)
    )?.map(({id}) => id);

    return {
        dataHolderChunks,
        selectedDataSourcesIds
    }
}
