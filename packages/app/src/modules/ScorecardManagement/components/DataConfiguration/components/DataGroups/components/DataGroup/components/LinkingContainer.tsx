import i18n from "@dhis2/d2-i18n";
import { Tooltip } from "@dhis2/ui";
import { IconButton } from "@material-ui/core";
import { IconLink24 } from "@dhis2/ui-icons";
import UnlinkIcon from "@material-ui/icons/LinkOff";
import React from "react";
import useLinkManage from "../../../../../hooks/useLinkManage";
import DataSourceHolder from "../../DataSourceHolder";
import { ScorecardDataHolder } from "@hisptz/dhis2-analytics";

export function LinkingContainer({
									 chunk,
									 onDelete,
									 onLink,
									 onUnlink,
									 groupIndex,
									 index
								 }: { index: number; groupIndex: number; chunk: Array<ScorecardDataHolder>; onDelete: (index: number) => void, onLink: (index1: number, index2: number) => void, onUnlink: (index: number) => void }) {
	const { linkable, hasLink, getIndex, onIconClick, onUnlinkClick } =
		useLinkManage({ onLink, onUnlink, chunk, groupIndex });

	return (
		<div className="linking-container">
			<div className="row align-items-center">
				<div className="column">
					{chunk?.map((source: ScorecardDataHolder, i) => (
						<Tooltip
							content={i18n.t(
								"Click to configure, drag to rearrange"
							)}
							key={`group-${groupIndex}-holder-${source.id}`}
						>
							<DataSourceHolder
								dataHolder={source}
								groupIndex={groupIndex}
								onUnlink={onUnlinkClick}
								onDelete={onDelete}
								key={`group-${groupIndex}-holder-${source}`}
								index={getIndex(source.id as string)}
							/>
						</Tooltip>
					))}
				</div>
				<div className="link-button-container">
					<Tooltip
						content={i18n.t("Click to {{linkAction}}", {
							linkAction: hasLink
								? i18n.t("unlink")
								: i18n.t("link")
						})}
					>
						<IconButton
							onClick={onIconClick}
							disabled={!linkable && !hasLink}
						>
							{(linkable || hasLink) &&
								(hasLink ? (
									<UnlinkIcon className="link-button" />
								) : (
									<IconLink24 />
								))}
						</IconButton>
					</Tooltip>
				</div>
			</div>
		</div>
	);
}
