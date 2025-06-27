import { useSetting } from "@dhis2/app-service-datastore";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { DATA_MIGRATION_CHECK } from "../../../shared";

export function useAutoMigration() {
	const [skipMigration] = useSetting(DATA_MIGRATION_CHECK, { global: true });
	const navigate = useNavigate();

	useEffect(() => {
		if (!skipMigration) {
			navigate("/migrate", { replace: true });
		}
	}, [navigate, skipMigration]);
}
