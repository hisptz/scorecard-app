export default class DataSource {
	constructor({ label, type }: any) {
		this.label = label;
		this.type = type;
		this.getDataSources = this.getDataSources.bind(this);
		this.getGroups = this.getGroups.bind(this);
	}

	async getGroups(engine: any) {
		return;
	}

	async getDataSources(engine: any, { filter, page }: any) {
		return;
	}

	async filter(engine: any, { selectedGroup, page, searchKeyword }: any) {
		return;
	}
}
