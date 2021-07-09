import PropTypes from 'prop-types'
import React from 'react'
import ScorecardGridCard from "./ScorecardGridCard";



export default function GridScorecardDisplay({scorecards}){

    return(
        <div className='scorecard-list-container grid p-32'>
            {
                scorecards?.map(scorecard => (
                    <ScorecardGridCard key={scorecard.id} scorecardId={scorecard?.id}/>))
            }
        </div>
    )
}

GridScorecardDisplay.propTypes = {
    scorecards: PropTypes.array.isRequired
};
