import {useEffect} from "react";
import {useSetRecoilState} from "recoil";
import {ScorecardDataLoadingState} from "../../../../../state";

export default function useTableLoadingState(dataEngine, orgUnits) {
    const setLoadingState = useSetRecoilState(
        ScorecardDataLoadingState(orgUnits)
    );

    useEffect(() => {
        const subscription = dataEngine.loading$.subscribe(setLoadingState);
        return () => {
            subscription.unsubscribe();
        };
    }, [orgUnits, dataEngine]);
}
