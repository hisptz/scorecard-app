import i18n from "@dhis2/d2-i18n";
//@ts-expect-error Centered Content type isn't exported from the UI lib
import { CenteredContent, colors } from "@dhis2/ui";
import { IconSearch24 } from "@dhis2/ui-icons";

export default function EmptySearchList({ keyword }: { keyword: string }) {
	return (
		<div className="h-100 w-100">
			<CenteredContent>
				<div className="column center align-items-center">
					<IconSearch24 color={colors.grey700} />
					<h2
						data-test={"no-scorecards-found-title"}
						style={{ color: colors.grey700, margin: 8 }}
					>
						{i18n.t("No scorecards found")}
					</h2>
					<p
						style={{
							color: colors.grey700,
							margin: 4,
						}}
					>
						{i18n.t(
							"Could not find scorecards matching the keyword "
						)}
						<b>{`'${keyword}'`}</b>
					</p>
				</div>
			</CenteredContent>
		</div>
	);
}
