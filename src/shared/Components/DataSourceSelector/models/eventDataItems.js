import {filter as _filter, isEmpty} from "lodash";
import NativeDataSource from "./nativeDataSource";


export default class EventDataItems extends NativeDataSource {

    constructor() {
        super({
            label: 'Event Data Items',
            resource: 'programTrackedEntityAttributes',
            dimensionItemType: '[PROGRAM_DATA_ELEMENT,PROGRAM_ATTRIBUTE]',
            filterType: 'in',
            groupKey: 'programId',
            groupResource: 'programs',
            type: 'programDataItem'

        });

        this.dataSourcesQuery = {
            attributes: {
                resource: 'programs',
                id: ({id}) => id,
                params: {
                    fields: [
                        'id',
                        'programTrackedEntityAttributes[trackedEntityAttribute[id,displayName,valueType]]',
                    ]
                }
            },
            dataElements: {
                resource: 'programDataElements',
                params: ({id, page}) => ({
                    program: id,
                    page,
                    filter: [
                        `valueType:eq:NUMBER`
                    ],
                    fields: [
                        'dataElement[id,displayName]',
                        'displayName',
                        'valueType'
                    ]
                })
            }
        }
    }

    async getDataSources(engine, {page, filter}) {
        if (!isEmpty(filter)) {
            const response = await engine?.query(this.dataSourcesQuery, {
                variables: {
                    page,
                    id: filter
                }
            })
            const trackedEntityAttributes = response?.sources?.programTrackedEntityAttributes?.map(({trackedEntityAttribute}) => trackedEntityAttribute)
            const dataElements = response?.dataElements?.programDataElements?.map(({dataElement}) => dataElement);
            return {
                data: [..._filter(trackedEntityAttributes, ['valueType', 'NUMBER']), ...dataElements],
                pager: response?.dataElements?.pager

            }
        }
        return {
            data: [],
            pager: {}
        }
    }

    async filter(engine, {page, selectedGroup}) {
        return this.getDataSources(engine, {page, filter: selectedGroup?.id})
    }
}
