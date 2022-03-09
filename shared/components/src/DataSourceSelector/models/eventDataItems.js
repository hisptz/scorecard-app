import { filter as _filter, isEmpty } from "lodash";
import NativeDataSource from "./nativeDataSource";

export default class EventDataItems extends NativeDataSource {
  constructor() {
    super({
      label: "Event Data Items",
      resource: "programTrackedEntityAttributes",
      dimensionItemType: "[PROGRAM_DATA_ELEMENT,PROGRAM_ATTRIBUTE]",
      filterType: "in",
      groupKey: "programId",
      groupResource: "programs",
      type: "dataElement",
    });

    this.dataSourcesQuery = {
      attributes: {
        resource: "programs",
        id: ({ id }) => id,
        params: {
          fields: [
            "id",
            "programTrackedEntityAttributes[trackedEntityAttribute[id,displayName,valueType]]",
          ],
        },
      },
      dataElements: {
        resource: "programDataElements",
        params: ({ id, page, filter }) => ({
          program: id,
          page,
          filter: [`valueType:eq:NUMBER`, ...filter],
          fields: ["dataElement[id,displayName]", "displayName", "valueType"],
        }),
      },
    };
  }

  async getDataSources(engine, { page, programId, searchKeyword }) {
    if (!isEmpty(programId)) {
      const response = await engine?.query(this.dataSourcesQuery, {
        variables: {
          page,
          id: programId,
          filter: searchKeyword ? [`displayName:ilike:${searchKeyword}`] : [],
        },
      });
      const trackedEntityAttributes = _filter(
        response?.sources?.programTrackedEntityAttributes?.map(
          ({ trackedEntityAttribute }) => trackedEntityAttribute
        ),
        ["valueType", "NUMBER"]
      );
      const filteredTrackedEntityAttributes = searchKeyword
        ? _filter(trackedEntityAttributes, ({ displayName }) =>
            displayName.toLowerCase().match(RegExp(searchKeyword.toLowerCase()))
          )
        : trackedEntityAttributes;
      const dataElements = response?.dataElements?.programDataElements?.map(
        ({ dataElement }) => dataElement
      );
      return {
        data: [...filteredTrackedEntityAttributes, ...dataElements],
        pager: response?.dataElements?.pager,
      };
    }
    return {
      data: [],
      pager: {},
    };
  }

  async filter(engine, { page, selectedGroup, searchKeyword }) {
    return this.getDataSources(engine, {
      page,
      programId: selectedGroup?.id,
      searchKeyword,
    });
  }
}
