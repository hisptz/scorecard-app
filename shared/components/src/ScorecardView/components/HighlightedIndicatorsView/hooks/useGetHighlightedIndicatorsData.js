import {sortBy} from "lodash";
import {useEffect, useState} from "react";
import {useRecoilValue} from "recoil";
import {PeriodResolverState, ScorecardConfigDirtyState} from "@hisptz/scorecard-state";
import {getHighlightedIndicatorsData} from "@hisptz/scorecard-services";


export default function useGetHighlightedIndicatorsData() {
    const periods = useRecoilValue(PeriodResolverState);
    const {orgUnits} = useRecoilValue(
        ScorecardConfigDirtyState("orgUnitSelection")
    );
    const highlightedIndicators = useRecoilValue(
        ScorecardConfigDirtyState("highlightedIndicators")
    );
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState();

    useEffect(() => {
        async function getData() {
            setLoading(true);
            const sortedOrgUnits = sortBy(orgUnits, "level");

            const response = await getHighlightedIndicatorsData({
                periods: periods?.map(({id}) => id),
                dataSources: highlightedIndicators,
                orgUnits: orgUnits?.map(({id}) => id),
            });
            setLoading(false);
        }

        getData();
    }, [periods, orgUnits]);

    return {
        loading,
    };
}
