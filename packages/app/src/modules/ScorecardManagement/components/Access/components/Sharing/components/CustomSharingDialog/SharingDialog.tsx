import React from "react";
import { AccessAdd } from "./components/AccessAdd";
import { AccessList } from "./components/AccessList";

export function SharingDialog() {

	return (
		<div id="sharing-form-area" className="column  gap-8">
			<AccessAdd />
			<AccessList />
		</div>
	);
}
