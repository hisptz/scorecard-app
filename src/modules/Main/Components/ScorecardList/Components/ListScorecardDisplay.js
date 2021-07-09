import PropTypes from 'prop-types'
import React from 'react'
import ScorecardListCard from "./ScorecardListCard";


export default function ListScorecardDisplay({scorecards}) {


    return (
        <div className='column'>
            {
                scorecards?.map(({id}) => (<ScorecardListCard scorecardId={id} key={id}/>))
            }
        </div>
    )
}

ListScorecardDisplay.propTypes = {
    scorecards: PropTypes.array.isRequired
};
