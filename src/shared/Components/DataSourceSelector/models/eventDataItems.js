import NativeDataSource from "./nativeDataSource";


export default class EventDataItems extends NativeDataSource {

    async getDataSources(engine, {page, filter}) {
        const finalFilter = [...(filter ?? []), `dimensionItemType:${this.filterType}:${this.dimensionItemType}`, `valueType:eq:NUMBER`]
        return super.getDataSources(engine, {page, filter: finalFilter});
    }

}
