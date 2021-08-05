import {useDataEngine} from "@dhis2/app-runtime";
import {atom, selector} from "recoil";

const userQuery = {
    user: {
        resource: 'me',
        params: {
            fields: [
                'id',
                'displayName',
                'userGroups',
                'authorities'
            ]
        }
    }
}

export const UserState = atom({
    key: 'userState',
    default: selector({
        key: 'userStateSelector',
        get: async () => {
            try {
                const engine = useDataEngine();
                const {user} = await engine.query(userQuery)
                if (user) return user
                return null
            } catch (e) {
                console.log(e)
            }
        }
    })
})
