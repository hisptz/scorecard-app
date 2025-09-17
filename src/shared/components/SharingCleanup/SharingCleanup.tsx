import i18n from "@dhis2/d2-i18n";
import cleanupImage from "@/assets/images/scorecard_cleanup.svg";
import { useSharingCleanup } from "@/shared/components/SharingCleanup/hooks/service";
import { CircularLoader, LinearLoader } from "@dhis2/ui";

export function SharingCleanup() {
	const { loading, processed, total } = useSharingCleanup();

	return (
		<div className=" h-full flex flex-col gap-4 align-items-center center">
			<img style={{
				height: "160px",
				width: "auto"
			}} alt="cleanup-image" src={cleanupImage} />
			<h2 className="text-[18px] font-bold">
				{i18n.t("Performing some housekeeping... Please wait.")}
			</h2>
			{
				loading && <CircularLoader small />
			}
			{
				!loading && (processed !== total) && (
					<LinearLoader amount={100 * (processed / total)} />
				)
			}
			{
				!loading && (processed === total) && (
					<p className="text-lg">
						{i18n.t("Done!")}
					</p>
				)
			}
		</div>
	);
}
