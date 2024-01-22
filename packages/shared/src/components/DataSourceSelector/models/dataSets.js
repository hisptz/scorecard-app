import {filter as _filter, flattenDeep} from "lodash";
import DataSource from "./dataSource";
import {updatePager} from "../../../utils";

export default class DataSets extends DataSource {
    constructor({label}) {
        super({
            label: label ?? "Data Sets",
            type: "dataSet",
        });
        this.groupKey = "dataSets.id";
        this.groupResource = "dataSets";
        this.categories = [
            {
                label: "Reporting rate",
                id: "REPORTING_RATE",
            },
            {
                label: "Reporting rate on time",
                id: "REPORTING_RATE_ON_TIME",
            },
            {
                label: "Actual reports",
                id: "ACTUAL_REPORTS",
            },
            {
                label: "Actual reports on time",
                id: "ACTUAL_REPORTS_ON_TIME",
            },
            {
                label: "Expected Reports",
                id: "EXPECTED_REPORTS",
            },
        ];
        this.groupQuery = {
            dataSets: {
                resource: this.groupResource,
                params: ({page, filter}) => ({
                    page,
                    fields: ["id", "displayName"],
                    totalPages: true,
                    filter,
                    order: "displayName:asc",
                }),
            },
        };
    }

    async getData(engine) {
        this.groups = engine.query(this.groupQuery)?.dataSets;
    }

    async getDataSources(engine, {filter, page}) {
        const response = await engine.query(this.groupQuery, {
            variables: {filter, page},
        });
        return {
            pager: response?.dataSets?.pager,
            data: flattenDeep(
                response?.dataSets?.dataSets?.map(({id, displayName}) =>
                    this.categories.map(({id: categoryId, label: categoryLabel}) => ({
                        id: `${id}.${categoryId}`,
                        displayName: `${displayName} - ${categoryLabel}`,
                    }))
                )
            ),
        };
    }

    async getGroups(engine) {
        const response = await engine.query(this.groupQuery, {
            variables: {filter: null, page: 1},
        });
        return response?.dataSets?.dataSets ?? [];
    }

    async filter(engine, {filter, selectedGroup, page, searchKeyword}) {
        const {data, pager} = await this.getDataSources(engine, {filter, page});
        if (selectedGroup) {
            const filteredData = _filter(data, ({id}) => {
                return id.split(".")[0] === selectedGroup?.id;
            });
            if (searchKeyword) {
                const searchedData = _filter(filteredData, ({id, displayName}) => {
                    const index = `${id}-${displayName}`;
                    return index.match(new RegExp(searchKeyword));
                });
                return {
                    pager: updatePager(pager, searchedData.length),
                    data: searchedData,
                };
            }
            return {
                pager: updatePager(pager, filteredData.length),
                data: filteredData,
            };
        }
        if (searchKeyword) {
            const filteredData = _filter(data, ({id, displayName}) => {
                const index = `${id}-${displayName}`;
                return index
                    .toLowerCase()
                    .match(new RegExp(searchKeyword.toLowerCase()));
            });
            return {
                pager: updatePager(pager, filteredData.length),
                data: filteredData,
            };
        }
    }
}
