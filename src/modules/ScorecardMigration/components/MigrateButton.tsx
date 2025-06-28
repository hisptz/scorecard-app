import i18n from "@dhis2/d2-i18n";
import { Button } from "@dhis2/ui";
import { OldScorecardSchema } from "../schemas/old";
import { useMigrateScorecard } from "../hooks/useMigrateScorecard";
import { Dispatch, SetStateAction, useCallback, useState } from "react";
import { useStep } from "usehooks-ts";
import { useAlert } from "@dhis2/app-runtime";

interface MigrateButtonProps {
	selected: string[];
	scorecards: OldScorecardSchema[];
	progress: Record<string, "SUCCESS" | "EXISTS" | "FAILED">;
	onProgressUpdate: Dispatch<
		SetStateAction<Record<string, "SUCCESS" | "EXISTS" | "FAILED">>
	>;
	onClearSelection: () => void;
}

export function MigrateButton({
	scorecards,
	selected,
	onProgressUpdate,
	onClearSelection,
}: MigrateButtonProps) {
	const [loading, setLoading] = useState<boolean>(false);
	const [value, { goToNextStep, reset }] = useStep(selected.length);
	const { migrate } = useMigrateScorecard();
	const { show } = useAlert(
		({ message }) => message,
		({ type }) => ({ ...type, duration: 3000 })
	);
	const count = selected.length;

	const onMigrateClick = useCallback(async () => {
		setLoading(true);
		const selectedScorecards = scorecards.filter((scorecard) =>
			selected.includes(scorecard.id)
		);
		for (const scorecard of selectedScorecards) {
			const results = await migrate(scorecard);
			onProgressUpdate((prev) => {
				return {
					...prev,
					[scorecard.id]: results,
				};
			});
			goToNextStep();
		}
		show({
			message: i18n.t("{{count}} scorecards successfully migrated", {
				value,
			}),
			type: { success: true },
		});
		onClearSelection();
		reset();
		setLoading(false);
	}, [selected, scorecards, onProgressUpdate, goToNextStep, migrate]);

	const countString = count === 0 ? "" : (`${count}` as any);

	return (
		<Button
			loading={loading}
			onClick={onMigrateClick}
			primary
			disabled={count === 0}
		>
			{loading
				? i18n.t("Migrating scorecard(s)... ({{progress}}/{{count}})", {
						count,
						progress: value,
				  })
				: i18n.t("Migrate {{count}} scorecard(s)", {
						count: countString,
				  })}
		</Button>
	);
}
