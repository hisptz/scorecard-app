import { useDeleteScorecard } from "./useScorecard";
import useScorecardsSummary from "./useScorecardsSummary";

export default function useAllScorecards() {
  const {
    removeSingleScorecardSummary,
    error,
    loading,
    summary,
    updateLoading,
  } = useScorecardsSummary();
  const {
    remove,
    loading: removeLoading,
    error: removeError,
  } = useDeleteScorecard("", { lazy: true });

  const deleteScorecard = async (id) => {
    await remove({
      id,
    });
    await removeSingleScorecardSummary(id);
  };

  return {
    scorecards: summary,
    error: error ?? removeError,
    loading,
    removeLoading: removeLoading || updateLoading,
    remove: deleteScorecard,
  };
}
