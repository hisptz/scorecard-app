import UserGroupIcon from '@material-ui/icons/People';
import UserIcon from '@material-ui/icons/Person';
import PublicIcon from '@material-ui/icons/Public';
import React from 'react'
import ScorecardAccessType from "../../../../../../../../core/constants/scorecardAccessType";

export function getAccessName(access = '') {
    switch (access) {
        case ScorecardAccessType.NO_ACCESS:
            return 'No Access'
        case ScorecardAccessType.READ_ONLY:
            return "Can Read"
        case ScorecardAccessType.READ_WRITE:
            return "Can Read and Write"

    }
}


export function getAccessIcon(type = '') {
    switch (type) {
        case 'public':
            return <PublicIcon/>
        case 'user':
            return <UserIcon/>
        case 'userGroup':
            return <UserGroupIcon/>
    }
}
