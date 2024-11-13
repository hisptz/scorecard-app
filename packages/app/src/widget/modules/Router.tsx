import { MemoryRouter, Route, Routes } from "react-router-dom";
import { WidgetNavigator } from "./Navigator";

export function WidgetRouter() {

	return (
		<MemoryRouter>
			<Routes>
				<Route path="/" index Component={WidgetNavigator} />
			</Routes>
		</MemoryRouter>
	);

}


