import NativeDataSource from "./nativeDataSource";

export default class DataElements extends NativeDataSource {
  async getDataSources(engine, { page, filter }) {
    const finalFilter = [...(filter ?? []), `valueType:eq:NUMBER`];
    return super.getDataSources(engine, { page, filter: finalFilter });
  }
}
