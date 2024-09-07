import { head, last } from "lodash";
import { useFormContext } from "react-hook-form";
import { ScorecardConfig, ScorecardDataHolder } from "@hisptz/dhis2-analytics";

export default function useLinkManage({
										  groupIndex,
										  onLink,
										  onUnlink,
										  chunk
									  }: { groupIndex: number; chunk: ScorecardDataHolder[], onLink: (index1: number, index2: number) => void, onUnlink: (index1: number) => void }) {
	const linkable = chunk.length > 1;
	const { getValues } = useFormContext<ScorecardConfig>();
	const hasLink = head(chunk)!.dataSources?.length > 1;

	const onLinkClick = () => {
		const dataHolders = getValues(`dataSelection.dataGroups.${groupIndex}.dataHolders`) ?? [];
		const firstHolderIndex = dataHolders.findIndex((holder) => holder.id === head(chunk)!.id);
		const secondHolderIndex = dataHolders.findIndex((holder) => holder.id === last(chunk)!.id);

		if (chunk.length > 1) {
			onLink(firstHolderIndex, secondHolderIndex);
		}
	};

	const onUnlinkClick = () => {
		if (hasLink) {
			const dataHolders = getValues(`dataSelection.dataGroups.${groupIndex}.dataHolders`) ?? [];
			const holderIndex = dataHolders.findIndex((holder) => holder.id === head(chunk)!.id);
			onUnlink(holderIndex);
		}
	};

	const onIconClick = () => {
		hasLink ? onUnlinkClick() : onLinkClick();
	};

	return {
		linkable,
		hasLink,
		onIconClick,
		onLinkClick,
		onUnlinkClick
	};
}
