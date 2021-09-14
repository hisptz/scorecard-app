import {useDataEngine} from "@dhis2/app-runtime";
import {queue} from 'async'
import {differenceBy, forIn, fromPairs, isEmpty, uniqBy} from "lodash";
import {useEffect, useState} from "react";
import {useResetRecoilState} from "recoil";
import {
    DATASTORE_ENDPOINT,
    DATASTORE_OLD_SCORECARD_ENDPOINT,
    DATASTORE_SCORECARD_SUMMARY_KEY
} from "../../../../../core/constants/config";
import {ScorecardSummaryState} from "../../../../../core/state/scorecard";
import getScorecardSummary from "../../../../../shared/services/getScorecardSummary";
import {migrateScorecard} from "../../../../../shared/utils/migrate";
import {generateCreateMutation, generateScorecardSummary} from "../../../../../shared/utils/scorecard";

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


const uploadNewScorecard = async ({scorecard, engine}) => {
    const newScorecard = migrateScorecard(scorecard)
    return await engine.mutate(generateCreateMutation(newScorecard?.id), {variables: {data: newScorecard}})
}


const summaryMutation = {
    type: 'update',
    resource: DATASTORE_ENDPOINT,
    id: DATASTORE_SCORECARD_SUMMARY_KEY,
    data: ({data}) => data,
}

const uploadSummary = async (engine, summary) => {
    return await engine.mutate(summaryMutation, {variables: {data: summary}})
}

const q = queue(uploadNewScorecard)

export default function useMigrateScorecard(onComplete) {
    const [error, setError] = useState();
    const [loading, setLoading] = useState(false);
    const resetSummary = useResetRecoilState(ScorecardSummaryState)
    const [progress, setProgress] = useState(0);
    const [count, setCount] = useState(0);
    const engine = useDataEngine()

    useEffect(() => {
        async function migrate() {
            setLoading(true)
            try {
                const {summary, error} = await getScorecardSummary(engine)
                if (error) {
                    throw error
                }
                const oldScorecards = await getOldScorecards(engine)
                setLoading(false)
                if (!isEmpty(oldScorecards)) {
                    const unMigratedScorecards = differenceBy(oldScorecards, summary, 'id')
                    if (isEmpty(unMigratedScorecards)) {
                        onComplete()
                        return
                    }
                    setCount(unMigratedScorecards.length)
                    q.push(unMigratedScorecards?.map(scorecard => ({scorecard, engine})), () => {
                        setProgress(prevState => prevState + 1)
                    })
                    q.drain(async () => {
                        const newSummary = unMigratedScorecards?.map(oldScorecard => {
                            const newScorecard = migrateScorecard(oldScorecard)
                            return generateScorecardSummary(newScorecard)
                        })
                        if (!isEmpty(newSummary)) {
                            const allSummary = uniqBy([...summary, ...newSummary], 'id')
                            await uploadSummary(engine, allSummary).then(onComplete)
                            resetSummary()
                        } else {
                            onComplete()
                        }
                    })
                }
            } catch (e) {
                if(e?.details?.httpStatusCode === 404)
                    {onComplete()}
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
