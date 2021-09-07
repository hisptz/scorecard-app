import {forIn, get, isEmpty} from 'lodash'

const REQUIRED_FIELDS = [
    'title',
    'description',
    'periodType'
]

function validateRequiredFields(scorecard, requiredFieldsPath = []) {
    const errors = {}
    forIn(scorecard, (value, key) => {
        if (requiredFieldsPath.includes(key) && isEmpty(get(scorecard, key))) {
            errors[key] = 'This field is required';
        }
    })
    return errors;
}


export default function validateScorecard(scorecard) {
    return validateRequiredFields(scorecard, REQUIRED_FIELDS) ?? {}
}

