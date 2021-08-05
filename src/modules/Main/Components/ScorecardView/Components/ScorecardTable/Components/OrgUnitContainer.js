import PropTypes from 'prop-types'
import {useRecoilValue, useRecoilValueLoadable} from "recoil";
import {OrgUnitPathState} from "../../../../../../../core/state/orgUnit";
import {ScorecardViewState} from "../../../../../../../core/state/scorecard";

export default function OrgUnitContainer({orgUnit}) {
    const pathNamesState = useRecoilValueLoadable(OrgUnitPathState(orgUnit?.path))
    const {showHierarchy} = useRecoilValue(ScorecardViewState('options'))

    return (
        showHierarchy ?
            pathNamesState?.state === 'hasValue' ?
                pathNamesState?.contents : 'Loading...'
            :
            orgUnit?.displayName
    )
}

OrgUnitContainer.propTypes = {
    orgUnit: PropTypes.object.isRequired
};

