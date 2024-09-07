import produce from "immer";
import { cloneDeep, defaultsDeep } from "lodash";

export default class DataModel {
	constructor(attributes = {}) {
		defaultsDeep(this, attributes, this.defaults);
	}

	get defaults() {
		return {};
	}

	static set(object: any, key: any, value: any) {
		if (key) {
			const updatedObject = cloneDeep(object);
			updatedObject[key] = value;
			return updatedObject;
		}
		return this;
	}

	static setObject(object: any, values: any = {}) {
		const updatedObject = cloneDeep(object);
		for (const key of Object.keys(values)) {
			updatedObject[key] = values[key];
		}
		return updatedObject;
	}
}

export class SavableDataModel extends DataModel {
	static async save(object: any, addFunction: any, user: any) {
		const newObject = produce(
			JSON.parse(JSON.stringify(object)),
			(draft: any) => {
				draft.user = { id: user?.id };
			},
		);
		return await addFunction(newObject);
	}

	static async update(object: any, updateFunction: any) {
		return await updateFunction(JSON.parse(JSON.stringify(object)));
	}
}
