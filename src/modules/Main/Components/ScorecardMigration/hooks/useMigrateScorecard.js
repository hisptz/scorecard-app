import {useDataEngine} from "@dhis2/app-runtime";
import {queue} from 'async'
import {differenceBy, forIn, fromPairs, isEmpty} from "lodash";
import {useEffect, useState} from "react";
import {DATASTORE_OLD_SCORECARD_ENDPOINT} from "../../../../../core/constants/config";
import {useAddScorecard} from "../../../../../shared/hooks/datastore/useScorecard";
import useScorecardsSummary from "../../../../../shared/hooks/datastore/useScorecardsSummary";
import {migrateScorecard} from "../../../../../shared/utils/migrate";

const oldScorecardsQuery = {
    scorecardKeys: {
        resource: DATASTORE_OLD_SCORECARD_ENDPOINT
    }
}


const generateOldScorecardQueries = (ids = []) => {
    return fromPairs(ids?.map(id => ([id, {
        resource: DATASTORE_OLD_SCORECARD_ENDPOINT,
        id
    }])))
}


async function getOldScorecards(engine) {
    const keys = await engine.query(oldScorecardsQuery)

    if (isEmpty(keys?.scorecardKeys)) {
        return []
    }
    const oldScorecardsObject = await engine.query(generateOldScorecardQueries(keys?.scorecardKeys))
    const oldScorecardsList = []
    forIn(oldScorecardsObject, (value, key) => {
        oldScorecardsList.push({...value, id: key})
    })

    return oldScorecardsList
}


const uploadNewScorecard = async ({scorecard, add}) => {
    const newScorecard = migrateScorecard(scorecard)
    return await add(newScorecard)
}

const q = queue(uploadNewScorecard)

export default function useMigrateScorecard(onComplete) {
    const {add} = useAddScorecard()
    const [error, setError] = useState();
    const [loading, setLoading] = useState(false);
    const {summary} = useScorecardsSummary()
    const [progress, setProgress] = useState(0);
    const [count, setCount] = useState(0);
    const engine = useDataEngine()

    useEffect(() => {
        async function migrate() {
            setLoading(true)
            try {
                const oldScorecards = await getOldScorecards(engine)
                setLoading(false)
                if (!isEmpty(oldScorecards)) {
                    const unMigratedScorecards = differenceBy(oldScorecards, summary, 'id')
                    if (isEmpty(unMigratedScorecards)) {
                        onComplete()
                        return
                    }
                    setCount(unMigratedScorecards.length)
                    q.push(unMigratedScorecards?.map(scorecard => ({scorecard, add})), () => {
                        setProgress(prevState => prevState + 1)
                    })
                    q.drain(onComplete)
                }
            } catch (e) {
                setError(e)
            }
        }

        migrate()

    }, []);

    return {
        progress,
        count,
        loading,
        error
    }
}
