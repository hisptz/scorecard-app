import NativeDataSource from "./nativeDataSource";

export default class DataElements extends NativeDataSource {
	async getDataSources(engine: any, { page, filter }: any) {
		const finalFilter = [...(filter ?? []), `valueType:eq:NUMBER`];
		return super.getDataSources(engine, { page, filter: finalFilter });
	}
}
