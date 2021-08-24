import {useDataQuery} from "@dhis2/app-runtime";
import {queue} from 'async'
import {useEffect} from "react";
import {DATASTORE_OLD_SCORECARD_ENDPOINT} from "../../../../../core/constants/config";
const oldScorecardsQuery = {
    scorecardKeys: {
        resource: DATASTORE_OLD_SCORECARD_ENDPOINT
    }
}

const singleOldScorecardQuery = {
    scorecard:{
        resource: DATASTORE_OLD_SCORECARD_ENDPOINT,
        id: ({id})=>id,
    }
}

export default function useMigrateScorecard() {
    const {data: keys, error: keysError, loading: keysLoading} = useDataQuery(oldScorecardsQuery)
    const scorecardFetch = async (key) =>{

    }

    const q = queue(scorecardFetch)

    useEffect(() => {

        if(keys){
            for (const key of keys){
                q.push(key)
            }
        }

        return () => {
        };
    }, [keys]);

}
