import { useLocation } from "react-router-dom";
import { useEffect } from "react";


export function SyncURLWithGlobalShell() {
	const location = useLocation();

	useEffect(() => {
		dispatchEvent(new PopStateEvent("popstate"));
	}, [location.key]);


	return null;
}