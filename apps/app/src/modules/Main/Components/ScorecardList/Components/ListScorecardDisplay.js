import PropTypes from "prop-types";
import React from "react";
import ScorecardListCard from "./Cards/ScorecardListCard";

export default function ListScorecardDisplay({scorecards}) {
    return (
        <div className="column">
            {scorecards?.map((scorecard) => (
                <ScorecardListCard scorecard={scorecard} key={scorecard?.id} grid={false}/>
            ))}
        </div>
    );
}

ListScorecardDisplay.propTypes = {
    scorecards: PropTypes.array.isRequired,
};
