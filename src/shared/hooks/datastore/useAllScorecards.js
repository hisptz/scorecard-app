import useScorecard from "./useScorecard";
import useScorecardsSummary from "./useScorecardsSummary";

export default function useAllScorecards() {
    const {removeSingleScorecardSummary, error, loading, summary, updateLoading} = useScorecardsSummary()
    const {remove, removeLoading, error: removeError} = useScorecard('');

    const deleteScorecard = async (id) => {
        await remove({
            id
        })
        await removeSingleScorecardSummary(id)
    }

    return {
        scorecards: summary?.scorecards,
        error: error ?? removeError,
        loading,
        removeLoading: removeLoading || updateLoading,
        remove: deleteScorecard
    }
}
