export const APP_NAME="Scorecard"
export const DATASTORE_NAMESPACE='hisptz-scorecard'
export const DATASTORE_ENDPOINT = 'dataStore/hisptz-scorecard'
export const DATASTORE_SCORECARD_SUMMARY_KEY = 'scorecard-summary'
export const DATASTORE_SCORECARD_SUMMARY_INCLUDE_KEYS = [
    {
        key: 'title',
        path: ['title']
    },
    {
        key: 'description',
        path: ['description']
    },
    {
        key: 'id',
        path: ['id']
    },
    {
        key: 'user',
        path: ['user', 'id']
    },
    {
        key: 'userAccesses',
        path: ['userAccesses']
    },
    {
        key: 'userGroupAccesses',
        path: ['userGroupAccesses']
    }
]
export const DATASTORE_OLD_SCORECARD_ENDPOINT='dataStore/scorecards'

