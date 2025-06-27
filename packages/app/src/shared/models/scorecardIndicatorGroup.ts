import DataModel from "./base";
import { uid } from "../utils";

export default class ScorecardIndicatorGroup extends DataModel {
	constructor(attributes: any) {
		super(attributes);
	}

	get defaults() {
		return {
			id: uid(),
			title: "",
			dataHolders: [],
			style: {
				backgroundColor: "#FFFFFF",
				color: "#000000",
			},
		};
	}
}
