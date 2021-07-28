import {compact} from 'lodash'
import {selectorFamily} from "recoil";
import {EngineState} from "./engine";
const {atomFamily} = require("recoil");


const orgUnitQuery = {
    orgUnit: {
        resource: 'organisationUnits',
        id: ({id}) => id,
        params: {
            fields: [
                'id',
                'displayName',
                'path'
            ]
        }
    }
}

export const OrgUnits = selectorFamily({
    key: 'orgUnitSelector',
    get: (id) => async ({get}) => {
        try {
            const engine = get(EngineState)
            const {orgUnit} = await engine.query(orgUnitQuery, {variables: {id}})
            return orgUnit
        } catch (e) {
            return {}
        }
    }
})

export const OrgUnitPathState = atomFamily({
    key: 'orgUnitPath',
    default: selectorFamily({
        key: 'orgUnitPathSelector',
        get: (path = '') => async ({get}) => {
            const orgUnits = compact(path.split('/'))
            const orgUnitNames = orgUnits.map((id) => {
                return get(OrgUnits(id))?.displayName
            })
            return orgUnitNames.join('/')
        }
    })
})
